import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JWTTokenService } from "./jwttoken.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private jwtTokenService: JWTTokenService) {}

    intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {

        const jwtToken = this.jwtTokenService.jwtToken;

        if (jwtToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + jwtToken)
            });

            return handler.handle(cloned);
        }
        else {
            return handler.handle(req);
        }
    }
}