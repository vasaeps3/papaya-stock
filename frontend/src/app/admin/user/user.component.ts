import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from "../../_auth/auth.service";


export class RegisterUser {
    email: string;
    password: string;
}

@Component({
    selector: "app-register",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
    public user: RegisterUser = new RegisterUser();
    public errorUserMsg: string;
    public loading: boolean = true;

    constructor(
        private _authService: AuthService
    ) { }

    public ngOnInit() {
        console.log("this.model");
        console.log(this.user);
    }

    public register(registerForm: NgForm) {
        this._authService.register(this.user.email, this.user.password)
            .subscribe(result => {
                this.loading = true;
                this.errorUserMsg = "";
            }, (error: HttpErrorResponse) => {
                this.errorUserMsg = JSON.parse(error.error).message;
                this.loading = false;
            });
    }
    public onEmailChange() {
        console.log(this.user.email);
    }
}
