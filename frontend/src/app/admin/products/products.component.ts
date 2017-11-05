import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";

import { ProductsService } from "./products.service";
import { PositionsService, IPosition, IProduct } from "../components/positions/position.service";


@Component({
    selector: "app-products",
    templateUrl: "./products.component.html"
})
export class ProductsComponent implements OnInit {
    public limit: number = 5;
    public page: number = 0;
    public offset = this.limit * this.page;

    public loadingProducts: boolean = false;
    public loadAll: boolean = false;

    // public scrollUpDistance: number = 3;
    public throttle: number = 100;
    public scrollDistance: number = 3;

    public products: IProduct[];
    constructor(
        private _productsService: ProductsService,
        private _positionsService: PositionsService
    ) { }

    public ngOnInit() {
        this.loadingProducts = true;
        this._productsService.getAll(this.limit, this.offset).subscribe(
            result => {
                let loadProduct: IProduct[] = this._positionsService.mergeProductsWithLocal(result);
                this.products = _.filter(loadProduct, (o) => o.quantityStock > 0);
                this.loadingProducts = false;
            }
        );
    }
    public onScrollDown() {
        if (this.loadingProducts || this.loadAll) {
            return;
        }
        this.page++;
        this.offset = this.limit * this.page;
        this.loadingProducts = true;
        this._productsService.getAll(this.limit, this.offset).subscribe(
            result => {
                let newProducts = this._positionsService.mergeProductsWithLocal(result);
                if (newProducts.length < this.limit) {
                    this.loadAll = true;
                }
                this.products.push(..._.filter(newProducts, (o) => o.quantityStock > 0));
                this.loadingProducts = false;
            }
        );
    }

    public onChangedPosition(objEvent: { productId: string; positionId: string }) {
        this._positionsService.changePosition(this.products, objEvent.productId, objEvent.positionId);
    }
}
