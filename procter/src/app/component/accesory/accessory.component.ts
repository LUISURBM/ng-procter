import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { switchMap, take } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';
import { keymessage } from 'src/app/shared/validation-msg';
import { BundleService } from 'src/app/bundle.service';

@Component({
	selector: 'app-accessory-basic',
	templateUrl: 'accessory.component.html'
})
export class AccessoryComponent implements OnInit {
	planning: any[] = [];
	invoice: any[] = [];
	messages: any[];
	group: FormGroup;
	accessory: FormGroup;

	constructor(private http: HttpClient, builder: FormBuilder, public toastService: ToastService, public bundleSrv: BundleService) {
		this.group = builder.group({
			loadorderid: new FormControl(null, Validators.required),
			loadid: new FormControl(null, Validators.required),
			deliveryid: new FormControl(null, Validators.required),
		});
		this.accessory = builder.group({
			// rejecttype: new FormControl(null, Validators.required),
			accessorytype: new FormControl(null, Validators.required),
			salesunit: new FormControl(null, Validators.required),
			quantity: new FormControl(null, Validators.required),
			requestdate: new FormControl(Date.now(), Validators.required),
			costoverrun: new FormControl(null, Validators.required),
			comentario: new FormControl(null)
		});

		http.get('http://localhost:8000/api/planning')
			.pipe(
				take(1)
			)
			.subscribe({
				next: (resp: any[]) => {
					this.planning = resp;
				}
			});

		http.get('http://localhost:8000/api/accessory')
			.pipe(
				take(1)
			)
			.subscribe({
				next: (resp: any[]) => {
					this.invoice = resp;
				}
			});
	}


	ngOnInit(): void {


		// this.group.valueChanges.subscribe({
		// 	next: (v) => {
		// 		console.log(this.group)
		// 		if (!this.group.invalid && !this.group.touched) return;
		// 		this.messages = [];
		// 		Object.keys(this.group.controls).forEach(k => {
		// 			if (!this.group.controls[`${k}`].errors) return;
		// 			Object.keys(this.group.controls[`${k}`].errors).forEach(l => {
		// 				if (this.group.controls[`${k}`].touched && this.group.controls[`${k}`].errors[`${l}`]) {
		// 					debugger
		// 					switch (`${l}`) {
		// 						case 'required':
		// 							this.messages.push({ message: `${keymessage[k]} es obligatorio` }); break;
		// 						case 'procter-validation':
		// 							this.messages.push({ message: `${k} ${l['procter-validation']}` }); break;
		// 						default: break;
		// 					}
		// 				}
		// 			});
		// 		})
		// 	}
		// })
	}

	get plannings() {
		return this.group.controls.plannings as FormArray;
	}
	beforeChange($event: NgbPanelChangeEvent) {
		if ($event.panelId === 'preventchange-2') {
			$event.preventDefault();
		}

		if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
			$event.preventDefault();
		}
	}

	save(reject, i) {

		Object.keys(this.group.controls).forEach((element: any) => {
			Object.keys(this.group.controls[element].errors).forEach(e => {
				this.messages = [];
				if (this.group.controls[element].errors[e] === 'required') {
					this.messages.push({ message: `${element} es obligatorio`, level: 'secondary', dismissible: false })
				}
			})
		});
		if (!this.group.valid) return;
		this.http.put('http://localhost:8000/api/reject/' + reject.loadid, { ...reject, ...this.group.value.plannings[i], delivery: undefined }).subscribe({
			next: (resp: any) => {
				this.toastService.show(resp, { classname: 'bg-danger text-light', delay: 15000 });
			}
		});
	}
	disabled = false;

	selectedLoadOrderId() {
		const selectedorder = this.planning.filter(p => p.loadorderid == `${this.group.value.loadorderid}`);
		return selectedorder && selectedorder.length > 0 ? selectedorder[0] : undefined;
	}
	selectedLoadId() {
		// TO-DO: 1-1 loadid-loadorderid ?
		const selectedLoad = this.planning.filter(p => p.loadid == `${this.group.value.loadid}`);
		return selectedLoad && selectedLoad.length > 0 ? selectedLoad[0] : undefined;
	}
	selecteddeliveryId() {
		// TO-DO: 1-1 loadid-loadorderid ?
		const selecteddelivery = this.planning.length == 0 ? this.planning : this.planning.reduce((s, p) => s.concat(p.delivery.filter(d => d.deliveryid == `${this.group.value.deliveryid}`)), []);
		return selecteddelivery && selecteddelivery.length > 0 ? selecteddelivery[0] : undefined;
	}

	selectedLoadOrderIdbydeliveryid() {
		const selectedorder = this.planning.filter(p => p.delivery.filter(d => d.deliveryid === this.selecteddeliveryId().deliveryid).length > 0);
		return selectedorder && selectedorder.length > 0 ? selectedorder[0] : undefined;
	}
	loadorderid() {
		if (this.invoice.filter(p => p.loadorderid == `${this.group.value.loadorderid}`).length == 0)
			this.group.patchValue({ loadorderid: undefined });
	}
	loadid() {
		if (!this.selectedLoadId()) {
			this.group.patchValue({ loadid: undefined });
		} else {
			this.group.patchValue({ loadorderid: this.selectedLoadId().loadorderid });
		}
	}
	deliveryid() {
		if (!this.selecteddeliveryId()) {
			this.group.patchValue({ deliveryid: undefined });
		} else {
			this.group.patchValue({ loadorderid: this.selectedLoadOrderIdbydeliveryid().loadorderid, loadid: this.selectedLoadOrderIdbydeliveryid().loadid });
		}
	}


	planningdatabyloadid() {
		return this.selectedLoadOrderId() ? [this.selectedLoadOrderId().loadid] : this.planning.map(p => p.loadid);
	}
	deliverdatabyloadid() {
		return this.selectedLoadOrderId() ? this.selectedLoadOrderId().delivery : this.planning.length < 1 ? this.planning : this.planning.reduce((s, p) => s.concat(p.delivery), []);
	}
}
