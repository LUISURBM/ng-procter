import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toast/toast.service';
import { keymessage } from 'src/app/shared/validation-msg';
import { ProcterValidator } from '../reject/procter-validator';

@Component({
	selector: 'app-planning-basic',
	templateUrl: 'planning.component.html'
})
export class PlanningComponent implements OnInit {
	planning: any[] = [];
	group: FormGroup;
	messages: any[];
	constructor(private http: HttpClient, public builder: FormBuilder, public toastService: ToastService) {
		this.group = builder.group({
			plannings: builder.array([]),
		});
		http.get('http://localhost:8000/api/planning').subscribe({
			next: (resp: any[]) => {
				console.log(resp);
				resp.map(o => { return { ...o, delivery: undefined }; }).forEach(p => this.plannings.push(builder.group({ ...p, ...this.nuevoPlan })));
				this.planning = resp.map(o => { return { ...o, enabled: true, delivery: o.delivery.map(d => { return { ...d, inView: false, invoice: d.invoice.map(i => { return { ...i, inView: undefined }; }) }; }) }; });
			}
		});
	}

	ngOnInit(): void {

		this.group.valueChanges.subscribe({
			next: (v) => {
				if (!this.group.invalid && !this.group.touched) return;
				this.messages = [];
				Object.keys(this.group.controls).forEach(k => {
					if (!this.group.controls[`${k}`].errors) return;
					Object.keys(this.group.controls[`${k}`].errors).forEach(l => {
						if (this.group.controls[`${k}`].touched && this.group.controls[`${k}`].errors[`${l}`]) {
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

	get nuevoPlan() {
		return this.builder.group({
			loadorderid: this.builder.control(null, [Validators.required]),
			licenseplate: this.builder.control(null, [Validators.required, ProcterValidator.placa]),
			drivercc: this.builder.control(null, [Validators.required, ProcterValidator.cedula]),
			drivername: this.builder.control(null, [Validators.required])
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

	save(plan, i) {
		this.http.put('http://localhost:8000/api/planning/' + plan.loadid, { ...plan, ...this.group.value.plannings[i], delivery: undefined }).subscribe({
			next: (resp: any) => {
				this.toastService.show(resp, { classname: 'bg-danger text-light', delay: 15000 });
			}
		});
	}
	disabled = false;
}
