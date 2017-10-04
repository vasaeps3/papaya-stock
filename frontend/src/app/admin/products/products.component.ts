import { Component, OnInit } from "@angular/core";

import { ProductsService } from "./products.service";


@Component({
    selector: "app-products",
    templateUrl: "./products.component.html"
})
export class ProductsComponent implements OnInit {
    public products: any;
    public clicks: number = 0;
    public testStr: string = "Tom";
    constructor(
        private _productsService: ProductsService
    ) { }

    public ngOnInit() {
        this._productsService.getAll().subscribe(
            result => {
                this.products = result;
            }
        );
    }
    public onChangedVariants(qwer: any) {
        console.log("Поменяли что-то в вариантах. Нужно новый объект засунуть в LocalStarage, ID зщышншыва = " + qwer);
    }
}
