import { OrdersService } from './orders.service';
import { Component, OnInit } from "@angular/core";


@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html"
})
export class OrdersComponent implements OnInit {
    orders: any;
    constructor(
        private _ordersService: OrdersService
    ) { }

    ngOnInit() {
        this._ordersService.getAllCounter().subscribe(
            result => {
                this.orders = result;
            }
        );
    }
}