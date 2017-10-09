import { Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Inject, Injectable } from "@angular/core";

import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";

import "rxjs/add/operator/do";


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(
        private _router: Router) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let token = currentUser && currentUser.token || "";
        // let token = "";
        const authReq = req.clone({ setHeaders: { "x-auth": token } });
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
                    return []; // TODO
                } else {
                    return Observable.throw(res);
                }
            });
    }
}
