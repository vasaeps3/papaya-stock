import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../auth/auth.service";


@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    public testdata: any;
    public errorMessage: string;

    constructor(public router: Router, private _authService: AuthService) {
    }

    public ngOnInit() {
        this._authService.login("qwe", "asda")
            .subscribe(
            data => this.testdata = data
            );
    }

    public login(loginForm: NgForm) {
        if (loginForm && loginForm.valid) {
            let userName = loginForm.form.value.email;
            let password = loginForm.form.value.password;
            console.log(userName, password);
            this._authService.login(userName, password).subscribe(data => console.log(data));
        } else {
            this.errorMessage = "Please enter a user name and password.";
        }
    }
    public onLoggedin() {
        localStorage.setItem("isLoggedin", "true");
    }

}
