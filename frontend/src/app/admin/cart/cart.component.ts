import * as _ from "lodash";
import { Observable } from "rxjs/Rx";
import { Component, OnInit } from "@angular/core";

import { OrdersService } from "../orders/orders.service";
import { IProduct, PositionsService } from "../components/positions/position.service";


@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html"
})
export class CartComponent implements OnInit {
    public products: IProduct[];
    public createdOrder: boolean = false;

    constructor(
        private _ordersService: OrdersService,
        private _positionsService: PositionsService
    ) { }

    public ngOnInit() {
        this._ordersService.getProductById(this._positionsService.loadIdProduct()).subscribe(
            result => {
                this.products = this._positionsService.mergeProductsWithLocal(result);
            }
        );
    }

    public onChangedPosition(objEvent: { productId: string; positionId: string }) {
        this._positionsService.changePosition(this.products, objEvent.productId, objEvent.positionId);
    }

    public createOrder() {
        this.createdOrder = true;
        this._ordersService.createOrder(this.products).subscribe(
            result => {
                console.log(result);
            }
        );
    }

}
