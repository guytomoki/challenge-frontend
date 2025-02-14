import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigningRequestService {

  constructor(private http: HttpClient) { }

  getSigningRequest() {
    return this.http.get('/api/signingRequest')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  sign() {
    return this.http.post(`/api/signingRequest/sign`, {})
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
