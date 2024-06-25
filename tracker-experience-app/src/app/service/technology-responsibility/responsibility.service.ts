import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResponsibilityService {
  private baseUrl: string = 'http://localhost:8080/v1/responsibility';

  constructor(private _httpClient: HttpClient) {

  }

  getTechnologyResponses(technology: string): Observable<any> {
    const url = this.baseUrl.concat('/{0}');
    return this._httpClient.get(this.format(url, technology));
  }

  private format(str: string, ...args: any[]): string {
    return str.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match;
    });
  }
}
