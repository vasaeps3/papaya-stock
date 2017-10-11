import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import * as request from "request-promise";

import { IProduct } from "./product.interface";
import { OPTIONS } from "../../common/base.service";

@Component()
export class ProductService {

    public async loadImage(product: IProduct) {
        let options = _.cloneDeep(OPTIONS);
        options.uri = product.image;
        options.followRedirect = false;
        return await request(options)
            .catch(err => {
                product.image = err.response.headers.location;
                return product;
            });
    }

    public async getStockAllProduct() {
        let options = _.cloneDeep(OPTIONS);
        options.uri += "/report/stock/all?groupBy=product&stockMode=positiveOnly";
        console.log(options.uri);
        return JSON.parse(await request(options)).rows;
    }

    public async getProductsById(str: string) {
        let options = _.cloneDeep(OPTIONS);
        options.uri += "/report/stock/all?stockMode=all" + str;
        return JSON.parse(await request(options)).rows;
    }

    public async getStockProductById(productId: string) {
        let options = _.cloneDeep(OPTIONS);
        options.uri += "/report/stock/all?groupBy=product&product.id=" + productId;
        return JSON.parse(await request(options)).rows;
    }

    public async getStockAllVariants(str: string) {
        let options = _.cloneDeep(OPTIONS);
        options.uri += "/report/stock/all?groupBy=variant&includeRelated=true" + str;
        return JSON.parse(await request(options)).rows;
    }

    public async getAll() {
        let options = _.cloneDeep(OPTIONS);
        options.uri += "/report/stock/all";
        let products = JSON.parse(await request(options));
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
        });
        return products.rows;
    }
}
