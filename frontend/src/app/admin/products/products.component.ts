import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";

import { ProductsService } from "./products.service";

export interface IPosition {
    id: string;
    quantity: number;
}

export interface IProductOrder {
    productId: string;
    positions: IPosition[];
}
export interface Iorder {
    products: IProductOrder[];
}
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
        // console.log("Поменяли что-то в вариантах. Нужно новый объект засунуть в LocalStarage, ID зщышншыва = ");
        this.changePositionStorage(qwer);
    }
    private changePositionStorage(newPrIdPosId: any) {
        let quantity: number = _.find(
            _.find(this.products, function (o: any) { return o.id === newPrIdPosId.productId; }).positions,
            function (j: any) {
                return j.id === newPrIdPosId.positionId;
            }
        ).quantity;
        let positionStorage = JSON.parse(localStorage.getItem("order")) || [];
        let productIndex: number = _.findIndex(
            positionStorage,
            function (o: any) {
                return o.productId === newPrIdPosId.productId;
            }
        );
        if (productIndex === -1) {
            let firstProduct: IProductOrder = {
                productId: newPrIdPosId.productId,
                positions: [{ id: newPrIdPosId.positionId, quantity: quantity }]
            };
            positionStorage.push(firstProduct);
        } else {
            let positionIndex: number = _.findIndex(
                positionStorage[productIndex].positions,
                function (o: any) {
                    return o.id === newPrIdPosId.positionId;
                }
            );
            if (positionIndex === -1) {
                positionStorage[productIndex].positions.push({
                    id: newPrIdPosId.positionId,
                    quantity: quantity
                });
            } else {
                positionStorage[productIndex].positions[positionIndex].quantity = quantity;
            }
        }
        this.clearEmptyProduct(positionStorage);
    }

    private clearEmptyProduct(positionStorage: any) {
        let productPositionDelete: Array<number> = [];
        _.each(positionStorage, function (product: IProductOrder, keyProduct) {
            let summaryQuantity: number = 0;
            let keyPositionDelete: Array<number> = [];
            _.each(product.positions, function (position: IPosition, keyPosition) {
                if (position.quantity === 0) {
                    keyPositionDelete.push(keyPosition);
                } else {
                    summaryQuantity += position.quantity;
                }
            });
            if (summaryQuantity === 0) {
                productPositionDelete.push(keyProduct);
            }
            console.log(positionStorage);
            console.log("нужно удалить позиции = " + keyPositionDelete);
            console.log(positionStorage);
            _.eachRight(keyPositionDelete, function (key) {
                positionStorage = positionStorage[keyProduct].positions.slice(key, 1);
            });

        });
        console.log("нужно удалить продукты = " + productPositionDelete);
        _.eachRight(productPositionDelete, function (key) {
            positionStorage = positionStorage.slice(key, 1);
        });
        localStorage.setItem("order", JSON.stringify(positionStorage));
    }
}

