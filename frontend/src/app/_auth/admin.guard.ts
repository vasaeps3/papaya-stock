import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { AuthService } from "./auth.service";


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private router: Router,
        private _authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._authService.isAdmin()) {
            return true;
        }
        this.router.navigate(["/"]);
        return false;
    }
}
