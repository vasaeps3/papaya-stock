import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToasterService } from "angular2-toaster";


export interface IOrder {
    id: string;
    name: string;
    sum: number;
    reservedSum: number;
    description?: string;
    state: {
        name: string;
        color: number;
    };
    updated: Date;
    created: Date;
}

@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html"
})
export class OrdersComponent implements OnInit {
    public orders: IOrder[];

    constructor(
        private _route: ActivatedRoute,
        private _toasterServise: ToasterService
    ) { }

    public ngOnInit() {
        this.orders = this._route.snapshot.data["orders"];
    }
    public qwe() {
        this._toasterServise.pop("success", "Args Title!!!", "Args Body");
    }
}
