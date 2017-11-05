import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import * as request from "request-promise";

import { IProduct } from "./product.interface";
import { CommonService } from "../../common/common.service";

@Component()
export class ProductService {

    constructor(
        private _commonServise: CommonService
    ) { }

    public async loadDesc(product: IProduct) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri += "/entity/product/" + product.id;
        let newProduct: IProduct = JSON.parse(await request(options));
        product.description = newProduct.description || null;
        return product;
    }

    public async loadImage(product: IProduct) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri = product.image;
        options.followRedirect = false;
        return await request(options)
            .catch(err => {
                product.image = err.response.headers.location;
                return product;
            });
    }

    public async getStockAllProduct(limit?: number, offset?: number) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        let limitStr = "";
        if (limit) {
            limitStr = "&limit=" + limit + "&offset=" + offset;
        }
        options.uri += "/report/stock/all?groupBy=product&stockMode=positiveOnly" + limitStr;
        console.log(options.uri);
        return JSON.parse(await request(options)).rows;
    }

    public async getProductsById(str: string) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri += "/report/stock/all?stockMode=all" + str;
        return JSON.parse(await request(options)).rows;
    }

    public async getStockProductById(productId: string) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri += "/report/stock/all?groupBy=product&product.id=" + productId;
        return JSON.parse(await request(options)).rows;
    }

    public async getStockAllVariants(str: string) {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri += "/report/stock/all?groupBy=variant&includeRelated=true" + str;
        return JSON.parse(await request(options)).rows;
    }

    public async getAll() {
        let options = _.cloneDeep(await this._commonServise.getOptions());
        options.uri += "/report/stock/all";
        let products = JSON.parse(await request(options));
        _.each(products.rows, function (product: any) {
            console.log(product.article);
        });
        return products.rows;
    }
}
