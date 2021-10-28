import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { switchMap, take } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';
import { keymessage } from 'src/app/shared/validation-msg';
import { BundleService } from 'src/app/bundle.service';
import { formatDate } from '@angular/common';
import { ProcterValidator } from '../reject/procter-validator';
import { environment } from 'src/environments/environment';

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
	minDate: Date = new Date();
	maxDate: Date = new Date();

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
			requesteddate: new FormControl(formatDate(this.maxDate, 'yyyy-MM-ddTHH:mm', 'es-Co'), [Validators.required, ProcterValidator.maxDateToday]),
			costoverrun: new FormControl(null, Validators.required),
			comentarios: new FormControl(null)
		});

		http.get(environment.procter_api+'api/planning')
			.pipe(
				take(1)
			)
			.subscribe({
				next: (resp: any[]) => {
					this.planning = resp;
				}
			});

		http.get(environment.procter_api+'api/accessory')
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


		this.accessory.valueChanges.subscribe({
			next: (v) => {
				console.log(this.accessory)
				if (!this.accessory.invalid && !this.accessory.touched) return;
				this.messages = [];
				Object.keys(this.accessory.controls).forEach(k => {
					if (!this.accessory.controls[`${k}`].errors) return;
					Object.keys(this.accessory.controls[`${k}`].errors).forEach(l => {
						if (this.accessory.controls[`${k}`].touched && this.accessory.controls[`${k}`].errors[`${l}`]) {
							debugger
							switch (`${l}`) {
								case 'required':
									this.messages.push({ message: `${keymessage[k]} es obligatorio` }); break;
								case 'procter-validation':
									this.messages.push({ message: `${k} ${l['procter-validation']}` }); break;
								default: break;
							}
						}
					});
				})
			}
		})
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

	save() {
		if (!this.accessory.valid) return;
		this.http.post(environment.procter_api+'api/accessory/', { ...this.group.value, ...this.accessory.value }).subscribe({
			next: (resp: any) => {
				this.toastService.show(resp, { classname: 'bg-danger text-light', delay: 15000 });
			},
			error: (error: any) => {
				error.error.forEach(e => this.toastService.show(e.error, { classname: 'bg-danger text-light', delay: 15000 }));

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

	requesteddate() {
		if (this.group.value.requesteddate && new Date(this.group.value.requesteddate) > new Date())
			this.group.patchValue({ requesteddate: undefined });

	}
}
