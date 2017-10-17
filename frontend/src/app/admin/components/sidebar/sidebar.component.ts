import { Component, OnInit } from "@angular/core";

import { AuthService } from "../../../_auth/auth.service";


@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
    public isAdmin: boolean = false;
    constructor(
        private _authService: AuthService
    ) { }
    isActive = false;
    showMenu = "";

    public ngOnInit(): void {
        console.log(this._authService.isAdmin());
        this.isAdmin = this._authService.isAdmin();
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    public addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = "0";
        } else {
            this.showMenu = element;
        }
    }
}
