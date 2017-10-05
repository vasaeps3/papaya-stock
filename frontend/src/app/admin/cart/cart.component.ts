import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";

import { CartService } from "./cart.service";
import { IProduct, PositionsService } from "../components/positions/position.service";


@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html"
})
export class CartComponent implements OnInit {
    public products: IProduct[];
    // public test:string = "trtes";
    constructor(
        private _cartService: CartService,
        private _positionsService: PositionsService
    ) { }

    public ngOnInit() {
        console.log("load CartComponent");
        this._cartService.getProductById(this._positionsService.loadIdProduct()).subscribe(
            result => {
                console.log(12);
            }
        )
        // this._productsService.getAll().subscribe(
        //     result => {
        //         this.products = this._positionsService.mergeProductsWithLocal(result);
        //     }
        // );
    }

    // public onChangedPosition(objEvent: { productId: string; positionId: string }) {
    //     this._positionsService.changePosition(this.products, objEvent.productId, objEvent.positionId);
    // }
}
