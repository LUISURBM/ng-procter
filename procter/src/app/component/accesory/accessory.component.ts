import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { switchMap, take } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';

@Component({
	selector: 'app-accessory-basic',
	templateUrl: 'accessory.component.html'
})
export class AccessoryComponent {
	invoice: any[] = [];
	messages: any[];
	group: FormGroup;
	rejection: FormGroup;

	constructor(private http: HttpClient, builder: FormBuilder, public toastService: ToastService) {
		this.group = builder.group({
			loadorderid: new FormControl(null, Validators.required),
			loadid: new FormControl(null, Validators.required),
			deliveryid: new FormControl(null, Validators.required),
		});
		this.rejection = builder.group({
			// rejecttype: new FormControl(null, Validators.required),
			accessorytype: new FormControl(null, Validators.required),
			salesunit: new FormControl(null, Validators.required),
			quantity: new FormControl(null, Validators.required),
			requestdate: new FormControl(Date.now(), Validators.required),
			costoverrun: new FormControl(null, Validators.required),
			comentario: new FormControl(null)
		});


		http.get('http://localhost:8000/api/invoice')
			.pipe(
				take(1)
			)
			.subscribe({
				next: (resp: any[]) => {
					this.invoice = resp;
				}
			});
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

	loadorderid() {
		if (this.invoice.filter(p => p.loadorderid == `${this.group.value.loadorderid}`).length == 0)
			this.group.patchValue({ loadorderid: undefined });
	}
}
