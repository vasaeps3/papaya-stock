import * as _ from 'lodash';
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import * as request from 'request-promise';

import { ServiceBase } from '../../common/base.service';


export class IProduct {
    id: string;
    description: string;
    article: string
    variants: IVariant[];
}
export class IVariant {
    id: string;
    quantity: number;
    name: string;
    code: string;
    article: string;
    salePrise: number;
}

@Component()
export class ProductService extends ServiceBase {

    constructor() {
        super()
    }


    public async getStockAllProduct() {
        this.options.uri = this.options.uri + "report/stock/all?groupBy=product";
        let products: IProduct = JSON.parse(await request(this.options)).rows;
        return products;
    }

    public async getAll() {

        this.options.uri = this.options.uri + "report/stock/all";
        console.log(this.options);
        let products = JSON.parse(await request(this.options));
        // let resProducts = {
        //     id
        // }
        // return products;
        // return _.map(products.rows, product => _.pick(product, [
        //     "stock",
        //     "reserve",
        //     "quantity",
        //     "name",
        //     "code",
        //     "article",
        //     "price",
        //     "salePrice",
        //     "uom",
        //     "image"
        // ]
        // ));
        _.each(products.rows, function (product: any) {
            console.log(product.article);
        })
        return products.rows;
    }
}
