import * as _ from "lodash";
import { Observable } from "rxjs/Rx";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { OrdersService } from "../orders/orders.service";
import { IProduct, PositionsService } from "../components/positions/position.service";


@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html"
})
export class CartComponent implements OnInit {
    public products: IProduct[];
    public createdOrder: boolean = false;
    public isCartEmpty: boolean = true;
    public summaryCount: number = 0;
    public summaryAmount: number = 0;

    constructor(
        private _ordersService: OrdersService,
        private _positionsService: PositionsService,
        private _activatedRouter: ActivatedRoute,
        private _router: Router
    ) { }

    public ngOnInit() {
        this._activatedRouter.data.subscribe(
            data => {
                this.isCartEmpty = _.isEmpty(data);
                this.products = this._positionsService.mergeProductsWithLocal(data["products"]);
                this.reloadSummary();
            }
        );
    }

    public onChangedPosition(objEvent: { productId: string; positionId: string }) {
        this._positionsService.changePosition(this.products, objEvent.productId, objEvent.positionId);
        this.reloadSummary();
    }

    public createOrder() {
        this.createdOrder = true;
        this._ordersService.createOrder(this.products).subscribe(
            result => {
                this._positionsService.deleteAllposition();
                this._router.navigate(["/admin/orders"]);
                this.createdOrder = false;
            }
        );
    }

    private reloadSummary() {
        this.summaryCount = 0;
        this.summaryAmount = 0;
        _.each(this.products, (product) => {
            this.summaryCount += product.quantity;
            this.summaryAmount += product.quantity * product.salePrice;
        });

    }

}
