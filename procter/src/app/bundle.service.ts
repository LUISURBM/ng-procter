import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BundleService {
  bundle: any[];
  constructor(private http: HttpClient) {
    this.http.get(environment.procter_api+'api/tablagen')
      .pipe(
        take(1)
      )
      .subscribe({
        next: (resp: any[]) => {
          this.bundle = resp;
        }
      });
  }

  get rejectTypes() {
    return this.bundle.filter(b => b.table_type === "TypeReject");
  }
  get rejectReasons() {
    return this.bundle.filter(b => b.table_type === "ReasonsReject");
  }
  get rejectUnits() {
    return this.bundle.filter(b => b.table_type === "UnidadesPedido");
  }
  get accessoryTypes() {
    return this.bundle.filter(b => b.table_type === "AccessoryTypes");
  }
  get returnTypes() {
    return this.bundle.filter(b => b.table_type === "ReturnTypes");
  }
}
