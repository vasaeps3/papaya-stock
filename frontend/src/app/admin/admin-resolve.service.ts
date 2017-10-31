import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";


import { AuthService } from "../_auth/auth.service";


@Injectable()
export class AdminResolverService implements Resolve<any>{

    constructor(
        private _authService: AuthService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        console.log("AdminResolverService");
        let currentUser = this._authService.reloadStorage();
        console.log("currentUser Reload!");
        return currentUser;
    }

}
