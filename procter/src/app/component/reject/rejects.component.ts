import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { BundleService } from 'src/app/bundle.service';
import { keymessage } from 'src/app/shared/validation-msg';
import { ToastService } from '../toast/toast.service';
import { ProcterValidator } from './procter-validator';
import { rejectsCfg } from './rejects';
import { Router } from '@angular/router';

@Component({
	selector: 'app-rejects-basic',
	templateUrl: 'rejects.component.html',
	styleUrls: ['./rejects.component.scss']
})
export class RejectsComponent implements OnInit {
	rejects: any[];

	minDate: Date = new Date();
	maxDate: Date = new Date();
	group: FormGroup;
	report: any;
	constructor(private builder: FormBuilder, private http: HttpClient, public toastService: ToastService, public bundleSrv: BundleService,

		private router: Router) {
		this.group = builder.group({
			fechainicio: new FormControl(formatDate(this.maxDate, 'yyyy-MM-ddTHH:mm', 'es-Co'), [Validators.required, ProcterValidator.maxDateToday]),
			fechafin: new FormControl(formatDate(this.maxDate, 'yyyy-MM-ddTHH:mm', 'es-Co'), [Validators.required, ProcterValidator.maxDateToday]),
		})
		this.minDate.setFullYear(new Date().getFullYear() - 1);


	}

	ngOnInit(): void {
		if (this.group.valid)
			this.group.valueChanges.subscribe({
				next: (v) =>
					this.http.get('http://localhost:8000/api/report/rejects/'+ this.group.value.fechainicio+"/"+this.group.value.fechafin)
						.pipe(take(1))
						.subscribe({
							next: (resp: any[]) => {
								console.log(resp)
								this.report = { ...rejectsCfg, dataSource: { data: resp } };
								this.rejects = resp;
							}
						})

			})

	}

	clear(control) {
		this.group.reset();
	}

	fechainicio() {
		if (this.group.value.fechainicio && new Date(this.group.value.fechainicio) > new Date())
			this.group.patchValue({ fechainicio: undefined });

	}
	fechafin() {
		if (this.group.value.fechafin && new Date(this.group.value.fechafin) > new Date())
			this.group.patchValue({ fechafin: undefined });

	}

	ver() {
		this.router.navigate(['/component/reject', {}]);
	}
}
