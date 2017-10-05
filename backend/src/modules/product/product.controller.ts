import * as _ from 'lodash';
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";

import { ProductService } from "./product.service";

export interface IProduct {
    id: string;
    name: string;
    article?: string;
    stock?: number;
    salePrice: number;
    description?: string;
    positions?: any[];
}

@Controller("product")
export class ProductController {
    constructor(private _productService: ProductService) {

    }
    @Post()
    public async getProductsById( @Res() res: Response, @Body() productsId: Array<string>) {
        // console.log(productsId);
        // let str: string = "";
        // _.each(productId, function (id) {
        //     str += "&product.id=" + id;
        // });
        let stockAllProducts: any[] = await this._productService.getStockProductsById(productsId);
        // // console.log(stockAllProducts);
        // _.each(productsId, async function (productId) {
        //      let stockProductById = await this._productService.getStockProductById(productId);
        //      console.log(stockProductById);
        // });
        // forEach()


        // let stockAllProducts: any[] = await this._productService.getStockProductById(str);
        res.status(HttpStatus.OK).json(stockAllProducts);
    }


    @Get()
    public async getStockAllProduct( @Res() res: Response) {
        // Вытянули с сервера все активные продукты
        let stockAllProducts: any[] = await this._productService.getStockAllProduct();
        // Сформировали массив в нужной нам форме
        let products: IProduct[] = this.makeProductsId(stockAllProducts);
        // Сформировали cnhjre id product
        let strFilterFromProductId: string = this.makeStrFilterFromProductId(products);
        // Вытянули с сервера все активные варианты
        let stockAllVariants: any[] = await this._productService.getStockAllVariants(strFilterFromProductId);
        // сформировали окончательный формат продукта
        _.each(stockAllVariants, function (variant) {
            _.find(products, function (o) {
                return o.article === variant.article;
            })
                .positions.push({
                    id: _.split(_.last(_.split(variant.meta.href, "/")), "?")[0],
                    stock: variant.quantity,
                    salePrice: variant.salePrice,
                    size: +variant.name.match(/\(([^\]]+)\)/ig).map(n => n.slice(1, -1))[0],
                    quantity: 0
                });
        });
        res.status(HttpStatus.OK).json(products);
    }

    private makeStrFilterFromProductId(products: IProduct[]): string {
        let str: string = "";
        _.each(products, function (product) {
            str += "&product.id=" + product.id;
        });
        return str;
    }
    private makeProductsId(stockAllProducts: any[]) {
        let products: IProduct[] = [];
        _.each(stockAllProducts, function (stockAllProduct) {
            let product: IProduct = {
                id: _.split(_.last(_.split(stockAllProduct.meta.href, "/")), "?")[0],
                name: stockAllProduct.name,
                article: stockAllProduct.article,
                stock: stockAllProduct.quantity,
                salePrice: stockAllProduct.salePrice,
                positions: []
            };
            products.push(product);
        });
        return products;
    }
}
