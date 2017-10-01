import * as _ from "lodash";
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Res } from "@nestjs/common";

import { ProductService } from "./product.service";

export interface IProduct {
    id: string;
    name: string;
    article?: string;
    salePrice: number
    description?: string;
}

@Controller("product")
export class ProductController {
    constructor(private _productService: ProductService) {

    }

    @Get()
    public async getAll( @Res() res: Response, @Body() boies: any) {
        let counter = await this._productService.getAll();

        res.status(HttpStatus.OK).json(counter);
    }

    @Get("test")
    public async getStockAllProduct( @Res() res: Response, @Body() boies: any) {
        let products: IProduct[] = [];

        let stockAllProducts = await this._productService.getStockAllProduct();
        _.each(stockAllProducts, function (stockAllProduct) {
            let product: IProduct = {
                id: _.split(_.last(_.split(stockAllProduct.meta.href, "/")), "?")[0],
                name: stockAllProduct.name,
                article: stockAllProduct.article,
                salePrice: stockAllProduct.salePrice
            };
            products.push(product);
        });
        if(products.length > 0){
            
        }
        console.log(products);
        res.status(HttpStatus.OK).json(stockAllProducts);
    }
}
