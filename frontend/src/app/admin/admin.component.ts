import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-admin",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute) { }

    public ngOnInit() {
        console.log("AdminComponent loaded");
        console.log(this.router.url);
        if (this.router.url === "/admin") {
            this.router.navigate(["/admin/products"], { relativeTo: this.route });
        }

    }
}
