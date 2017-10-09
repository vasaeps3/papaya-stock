import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";

import { ProductsService } from "./products.service";
import { PositionsService, IPosition, IProduct } from "../components/positions/position.service";


@Component({
    selector: "app-products",
    templateUrl: "./products.component.html"
})
export class ProductsComponent implements OnInit {
    public products: IProduct[];
    constructor(
        private _productsService: ProductsService,
        private _positionsService: PositionsService
    ) { }

    public ngOnInit() {
        this._productsService.getAll().subscribe(
            result => {
                this.products = this._positionsService.mergeProductsWithLocal(result);
            }
        );
    }

    public onChangedPosition(objEvent: { productId: string; positionId: string }) {
        this._positionsService.changePosition(this.products, objEvent.productId, objEvent.positionId);
    }
}
