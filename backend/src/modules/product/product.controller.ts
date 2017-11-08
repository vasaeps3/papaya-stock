import * as _ from "lodash";
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Post, Query, Res } from "@nestjs/common";
import * as bluebird from "bluebird";

import { ProductService } from "./product.service";
import { IProduct, IPosition, IStockEntity } from "./product.interface";


@Controller("product")
export class ProductController {

    constructor(private _productService: ProductService) { }

    @Post()
    public async getProductsById( @Res() res: Response, @Body() products: Array<IProduct>) {
        let productsStr: string = this.getStrProductsId(products);
        let productsStock: IStockEntity[] = await this._productService.getProductsById(productsStr);
        products = this.convertProducts(productsStock);
        products = await this.loadDesc(products);
        products = await this.loadImages(products);
        products = await this.addPositionsFromProduct(products);
        res.status(HttpStatus.OK).json(products);
    }

    @Get()
    public async getStockAllProduct( @Res() res: Response, @Query() query?: any) {
        let limit: number = +query.limit || 0;
        let offset: number = +query.offset || 0;
        let search: string = query.search && query.search + "" || null;
        let productsStock: IStockEntity[] = await this._productService.getStockAllProduct(limit, offset, search);
        let products: IProduct[] = this.convertProducts(productsStock);
        products = await this.loadDesc(products);
        products = await this.loadImages(products);
        products = await this.addPositionsFromProduct(products);
        products = _.each(products, (o) => { _.filter(o.positions, (v) => v.quantity > 0); });
        res.status(HttpStatus.OK).json(products);
    }

    private loadDesc(products: IProduct[]) {
        let _productService = this._productService;
        return bluebird.Promise.map(products, function (product) {
            return _productService.loadDesc(product);
        }).then(function (result) {
            return result;
        });
    }

    private loadImages(products: IProduct[]) {
        let _productService = this._productService;
        return bluebird.Promise.map(products, function (product) {
            return _productService.loadImage(product);
        }).then(function (result) {
            return result;
        });
    }

    private convertProducts(productsStock: IStockEntity[]) {
        let products: IProduct[] = [];
        _.each(productsStock, function (productStock) {
            let product: IProduct = {
                id: _.split(_.last(_.split(productStock.meta.href, "/")), "?")[0],
                name: productStock.name,
                image: productStock.image.miniature.href,
                article: productStock.article,
                stock: 0,
                quantityStock: productStock.quantity,
                salePrice: productStock.salePrice,
                positions: []
            };
            products.push(product);
        });
        return products;
    }

    private async addPositionsFromProduct(products: IProduct[]) {
        let positionsStock: IStockEntity[] = await this._productService.getStockAllVariants(this.getStrProductsId(products));
        _.each(_.filter(positionsStock, (o) => o.quantity > 0), function (positionStock) {
            let productNow: IProduct = _.find(products, function (product) {
                return product.article === positionStock.article;
            });
            productNow.stock += positionStock.quantity;
            productNow.positions.push({
                id: _.split(_.last(_.split(positionStock.meta.href, "/")), "?")[0],
                stock: positionStock.quantity,
                salePrice: positionStock.salePrice,
                size: +positionStock.name.match(/\(([^\]]+)\)/ig).map(n => n.slice(1, -1))[0],
                quantity: 0
            });
        });
        return products;
    }

    private getStrProductsId(products: IProduct[]): string {
        let str: string = "";
        _.each(products, function (product) {
            str += "&product.id=" + product.id;
        });
        return str;
    }

}
