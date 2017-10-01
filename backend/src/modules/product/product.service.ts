import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";

import * as request from "request-promise";


@Component()
export class ProductService {
    public options = {
        uri: "https://online.moysklad.ru/api/remap/1.1/report/stock/all",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic  YWRtaW5Aa2FsaW5vZmZza2kxOjA1NGFmMjkwNTU="
        }
    };
    constructor() { }

    public async getAll() {
        let products = JSON.parse(await request(this.options));
        // return products;
        return _.map(products.rows, product => _.pick(product, [
            "stock",
            "reserve",
            "quantity",
            "name",
            "code",
            "article",
            "price",
            "salePrice",
            "uom",
            "image"
        ]
        ));
    }
}
