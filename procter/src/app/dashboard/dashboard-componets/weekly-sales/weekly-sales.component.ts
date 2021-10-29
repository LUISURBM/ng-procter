import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-weekly-sales',
  templateUrl: './weekly-sales.component.html',
  styleUrls: ['./weekly-sales.component.css']
})
export class WeeklySalesComponent implements OnInit {

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
    if (!this.planning || !this.planning.rejects || this.planning.rejects.length < 1) return 0;
    if (!this.planning || !this.planning.invoice || this.planning.invoice.length < 1) return 0;
    const pendientes = this.planning.rejects.filter(p => !p.loadorderid);
    return (100 / this.planning.invoice.length) * (this.planning.rejects.length - pendientes);
  }

  ngOnInit(): void {
  }

}