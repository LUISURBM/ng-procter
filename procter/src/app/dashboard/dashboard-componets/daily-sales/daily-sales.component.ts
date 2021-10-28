import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-daily-sales',
  templateUrl: './daily-sales.component.html',
  styleUrls: ['./daily-sales.component.css']
})
export class DailySalesComponent {
  planning: any;
  constructor(private http: HttpClient) {
    http.get(environment.procter_api+'api/dashboard').subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.planning = resp;
      }
    });
  }

  get porcentajeprocesados() {
    if (!this.planning || !this.planning.planning || this.planning.planning.length < 1) return 0;
    const pendientes = this.planning.planning.filter(p => !p.loadorderid);
    return (100/this.planning.planning.length)*(this.planning.planning.length - pendientes);
  }
}
