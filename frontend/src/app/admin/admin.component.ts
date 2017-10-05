import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-admin",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {

    constructor(
        public router: Router,
        private route: ActivatedRoute) { }

    public ngOnInit() {
        console.log("AdminComponent loaded");
        console.log(this.router.url);
        // this.router.navigate(["products"], { relativeTo: this.route });
        // if (this.router.url === "/admin") {


        // }
    }

}
