import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { AuthService } from "../../../_auth/auth.service";
import { RegisterUser } from "../user.component";


@Component({
    selector: "app-change-password",
    templateUrl: "./change-password.component.html"
})
export class ChangePasswordComponent implements OnInit {
    public loading: boolean = false;
    public user: RegisterUser = new RegisterUser();
    public confirmed: boolean = false;
    public companies: string[] = ["Apple", "Huawei", "Xiaomi", "Samsung", "LG", "Motorola", "Alcatel"];
    public allUser: RegisterUser[];

    constructor(
        private _route: ActivatedRoute,
        private _authService: AuthService
    ) { }

    public ngOnInit() {
        this.allUser = this._route.snapshot.data["users"];
        this.user.email = this._authService.currentUser.user.name;
    }

    public onChange(confirmPassword: string) {
        confirmPassword !== this.user.password ? this.confirmed = false : this.confirmed = true;
    }
    public change(changeFrom: NgForm) {
        console.log(12);
        // this._authService.register(this.user.email, this.user.password)
        //     .subscribe(result => {
        //         this.loading = true;
        //         this.errorUserMsg = "";
        //     }, (error: HttpErrorResponse) => {
        //         this.errorUserMsg = JSON.parse(error.error).message;
        //         this.loading = false;
        //     });
    }

}
