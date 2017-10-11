import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";


@Component({
    selector: "app-orders-detail",
    templateUrl: "./order-detail.component.html"
})
export class OrderDetailComponent implements OnInit {

    constructor(
        private _route: ActivatedRoute
    ) { }

    public ngOnInit() {
        this._route.params
            .subscribe(
            params => {
                let orderId = params["id"];
                console.log("Load-detail-qwe=", orderId);
            });
    }
}
