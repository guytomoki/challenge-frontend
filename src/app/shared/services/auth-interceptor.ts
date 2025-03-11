import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, switchMap } from "rxjs";
import { JWTTokenService } from "./jwttoken.service";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private jwtTokenService: JWTTokenService, private authService: AuthService, private router: Router) {}

    intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {

        const jwtToken = this.jwtTokenService.jwtToken;
        const jwtRefreshToken = this.jwtTokenService.jwtRefreshToken;
        if (jwtToken && req.url !== '/api/auth/refreshToken') {
            console.log("isRefreshTokenExpired()", this.jwtTokenService.isRefreshTokenExpired());
            if (this.jwtTokenService.isTokenExpired() && jwtRefreshToken) {
                if (this.jwtTokenService.isRefreshTokenExpired()) {
                    this.router.navigate(['/login']);
                    return EMPTY;
                }
                return this.authService.refreshToken(jwtRefreshToken).pipe(
                    switchMap(() => this.addAuthorizationAndHandle(req, handler))
                );
            }

            return this.addAuthorizationAndHandle(req, handler);
        }
        
        return handler.handle(req);
    }

    private addAuthorizationAndHandle(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        const cloned = req.clone({
            headers: req.headers.set("Authorization",
                "Bearer " + this.jwtTokenService.jwtToken)
        });

        return handler.handle(cloned);
    }
}