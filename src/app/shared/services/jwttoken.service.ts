import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

    jwtToken!: string;
    decodedToken!: { [key: string]: string; };

    constructor() {
    }

    setToken(token: string) {
      if (token) {
        this.jwtToken = token;
      }
    }

    decodeToken() {
      if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken);
      }
    }

    getDecodeToken() {
      return jwtDecode(this.jwtToken);
    }

    getUsername() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken['sub'] : null;
    }

    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? Number(this.decodedToken['exp']) : null;
    }

    isTokenExpired(): boolean {
      const expiryTime = this.getExpiryTime();
      if (expiryTime) {
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
    }
}
