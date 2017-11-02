import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from "angular2-toaster";

import { AuthService } from "../../_auth/auth.service";


export class RegisterUser {
    name: string;
    password: string;
    confirmPassword?: string;
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
        private _authService: AuthService,
        private _toasterServise: ToasterService
    ) { }

    public ngOnInit() {
    }

    public register(registerForm: NgForm) {
        this._authService.register(this.user.name, this.user.password)
            .subscribe(
            result => {
                this.loading = true;
                this.errorUserMsg = "";
                this._toasterServise.pop("success", "Пользователь успешно зарегистрирован", result.name);
            }, (error: HttpErrorResponse) => {
                this.errorUserMsg = error.error.message;
                this.loading = false;
            });
    }
    public onEmailChange() {
        console.log(this.user.name);
    }
}
