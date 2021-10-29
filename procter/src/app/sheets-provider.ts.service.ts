import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SheetsProvider {
  data: any = null;
  constructor(public http: HttpClient) { }
  
    public getSheetData(): Observable < any > {
    const sheetId = '15Kndr-OcyCUAkBUcq6X3BMqKa_y2fMAXfPFLiSACiys';
    const url = `https://spreadsheets.google.com/feeds/list/${sheetId}/od6/public/values?alt=json`;

    return this.http.get(url)
      .pipe(
        map((res: any) => {
          const data = res.feed.entry;

          const returnArray: Array<any> = [];
          if (data && data.length > 0) {
            data.forEach(entry => {
              const obj = {};
              for (const x in entry) {
                if (x.includes('gsx$') && entry[x].$t) {
                  obj[x.split('$')[1]] = entry[x]['$t'];
                }
              }
              returnArray.push(obj);
            });
          }
          return returnArray;
        })
      );
  }
}
