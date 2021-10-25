import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BundleService {
  bundle: any[];
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8000/api/tablagen')
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
    return this.bundle.filter(b => b.table_type === "ReasonsReject");
  }
  get rejectUnits() {
    return this.bundle.filter(b => b.table_type === "UnidadesPedido");
  }
  get accessoryTypes() {
    return this.bundle.filter(b => b.table_type === "AccessoryTypes");
  }
}
