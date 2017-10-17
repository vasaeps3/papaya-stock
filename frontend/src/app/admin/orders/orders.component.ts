import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";


export interface IOrder {
    id: string;
    name: string;
    sum: number;
    reservedSum: number;
    state: {
        name: string;
        color: number;
    };
    update: Date;
    created: Date;
}

@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html"
})
export class OrdersComponent implements OnInit {
    public orders: IOrder[];

    constructor(
        private _route: ActivatedRoute
    ) { }

    public ngOnInit() {
        this.orders = this._route.snapshot.data['orders'];
    }
}
