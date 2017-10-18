import { IOrder } from '../orders.component';
import { IProduct } from '../../components/positions/position.service';
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { OrdersService } from '../orders.service';


@Component({
    selector: "app-orders-detail",
    templateUrl: "./order-detail.component.html"
})
export class OrderDetailComponent implements OnInit {
    public products: IProduct[];
    public order: IOrder;

    constructor(
        private _route: ActivatedRoute,
        private _orderService: OrdersService
    ) { }

    public ngOnInit() {
        this._route.params.subscribe(
            params => {
                let orderId = params["id"];
                this._orderService.getOrderById(orderId).subscribe(
                    (result: any) => {
                        this.order = result;
                        this.products = result.products;
                    }
                );
                console.log("Load-detail-qwe=", orderId);
            }
        );
    }
}
