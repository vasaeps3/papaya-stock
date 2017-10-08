import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { AuthService } from "../../../_auth/auth.service";


@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    public errorMessage: string;
    public model: any = {};
    public loading: boolean = false;

    constructor(
        public _router: Router,
        private _authService: AuthService) { }

    public ngOnInit() {
        console.log("ngOnInit LoginComponent");
        console.log("this._authService.isLoggedIn() =>"+this._authService.isLoggedIn());
        console.log("this._authService.token =>"+this._authService.token);
        //this._authService.logout();
    }
    public login() {
        this.loading = true;
        console.log(this.model);
        this._authService.login(this.model.username, this.model.password)
            .subscribe(result => {
                console.log("LoginComponent->subscribe");
                let token = result && result.token;
                console.log("LoginComponent->subscribe->token"+token);
                if (token) {
                    this._authService.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ username: this.model.username, token: token }));
                    this._router.navigate(["/admin"]);
                } else {
                    this.errorMessage = "Username or password is incorrect";
                    this.loading = false;
                }
            }, (error: HttpErrorResponse) => {
                this.errorMessage = JSON.parse(error.error).message;
                this.model.username.invalid;
                this.loading = false;
            });
    }
}
