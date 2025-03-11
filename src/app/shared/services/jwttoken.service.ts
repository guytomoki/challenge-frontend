import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JWTTokenService {

    jwtToken!: string;
    jwtRefreshToken!: string;
    decodedToken!: { [key: string]: string; };
    decodedRefreshToken!: { [key: string]: string; };

    constructor() {
    }

    setToken(token: string) {
      if (token) {
        this.jwtToken = token;
      }
    }

    setRefreshToken(refreshToken: string) {
      if (refreshToken) {
        this.jwtRefreshToken = refreshToken;
      }
    }

    decodeToken() {
      if (this.jwtToken) {
      this.decodedToken = jwtDecode(this.jwtToken);
      }
    }

    decodeRefreshToken() {
      if (this.jwtRefreshToken) {
        this.decodedRefreshToken = jwtDecode(this.jwtRefreshToken);
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

    getRefreshExpiryTime() {
      this.decodeRefreshToken();
      return this.decodedRefreshToken ? Number(this.decodedRefreshToken['exp']) : null;
    }

    isTokenExpired(): boolean {
      const expiryTime = this.getExpiryTime();
      if (expiryTime) {
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
    }

    isRefreshTokenExpired(): boolean {
      const expiryTime = this.getRefreshExpiryTime();
      if (expiryTime) {
        return ((1000 * expiryTime) - (new Date()).getTime()) < 1000;
      } else {
        return false;
      }
    }

    clearTokens() {
      this.jwtToken = '';
      this.jwtRefreshToken = '';
    }
}
