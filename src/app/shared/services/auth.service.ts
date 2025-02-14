import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWTTokenService } from './jwttoken.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtService: JWTTokenService) {
  }
    
  login(form:any ) {
      return this.http.post('/api/auth/authenticate', form)
          .pipe(
            map((response: any) => {
              this.jwtService.setToken(response.access_token);
            })
          );
  }
}
