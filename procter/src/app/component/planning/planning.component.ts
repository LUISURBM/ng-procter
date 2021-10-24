import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toast/toast.service';

@Component({
	selector: 'app-planning-basic',
	templateUrl: 'planning.component.html'
})
export class PlanningComponent {
	planning: any[] = [];
	group: FormGroup;

	constructor(private http: HttpClient, builder: FormBuilder, public toastService: ToastService) {
		this.group = builder.group({
			plannings: builder.array([])
		});
		http.get('http://localhost:8000/api/planning').subscribe({
			next: (resp: any[]) => {
				console.log(resp);
				resp.map(o => { return { ...o, delivery: undefined }; }).forEach(p => this.plannings.push(builder.group(p)));
				this.planning = resp.map(o => { return { ...o, delivery: o.delivery.map(d => { return { ...d, inView: false, invoice: d.invoice.map(i => { return { ...i, inView: undefined }; }) }; }) }; });
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

	save(plan, i) {
		this.http.put('http://localhost:8000/api/planning/' + plan.loadid, { ...plan, ...this.group.value.plannings[i], delivery: undefined }).subscribe({
			next: (resp: any) => {
				this.toastService.show(resp, { classname: 'bg-danger text-light', delay: 15000 });
			}
		});
	}
	disabled = false;
}
