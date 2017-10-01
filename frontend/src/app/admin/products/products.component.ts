import { Component, OnInit } from "@angular/core";

import { ProductsService } from "./products.service";


@Component({
    selector: "app-products",
    templateUrl: "./products.component.html"
})
export class ProductsComponent implements OnInit {
    public orders: any;
    constructor(
        private _productsService: ProductsService
    ) { }

    public ngOnInit() {
        this._productsService.getAll().subscribe(
            result => {
                this.orders = result;
            }
        );
    }
}
