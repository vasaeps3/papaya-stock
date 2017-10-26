import { AuthService } from './auth.service';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Inject, Injectable, Injector } from '@angular/core';

import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";

import 'rxjs/add/operator/do';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(
        private _router: Router,
        private _injector: Injector
    ) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("HttpInterceptorService->intercept");
        const authService = this._injector.get(AuthService);
        console.log("HttpInterceptorService->getStorageCurrentUser");
        let currentUser = authService.getStorageCurrentUser();
        console.log("HttpInterceptorService->currentUser=");
        console.log(currentUser);
        const authReq = req.clone(
            {
                setHeaders: {
                    "Content-Type": "application/json",
                    "x-auth": currentUser && currentUser.token || ""
                }
            }
        );
        return next.handle(authReq)
            .do(evt => {
                if (evt instanceof HttpResponse) {
                    console.log("---> status:", evt.status);
                    console.log("---> filter:", req.params.get("filter"));
                }
            })
            .catch((res) => {
                if (res.status === 401) {
                    this._router.navigate(["/login"]);
                    return Observable.of([]);
                }
                return Observable.throw(res);
            });
    }
}
