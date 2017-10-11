import { Component, OnInit } from "@angular/core";

import { OrdersService } from "./orders.service";


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
        private _ordersService: OrdersService
    ) { }

    public ngOnInit() {
        this._ordersService.getAllOrders().subscribe(
            result => {
                this.orders = result;
            }
        );
    }
}
