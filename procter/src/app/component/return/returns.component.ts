import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { BundleService } from 'src/app/bundle.service';
import { ToastService } from '../toast/toast.service';
import { returnsCfg } from './returns';
import { ProcterValidator } from '../reject/procter-validator';

@Component({
	selector: 'app-returns-basic',
	templateUrl: 'returns.component.html',
	styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent implements OnInit {
	returns: any[];

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
					this.http.get('http://localhost:8000/api/report/returns/'+ this.group.value.fechainicio+"/"+this.group.value.fechafin)
						.pipe(take(1))
						.subscribe({
							next: (resp: any[]) => {
								console.log(resp)
								this.report = { ...returnsCfg, dataSource: { data: resp! } };
								this.returns = resp;
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
		this.router.navigate(['/component/return', {}]);
	}
}
