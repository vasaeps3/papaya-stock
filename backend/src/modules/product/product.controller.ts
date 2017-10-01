import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Res } from "@nestjs/common";

import { ProductService } from "./product.service";


@Controller("product")
export class ProductController {
    constructor(private _productService: ProductService) {

    }

    @Get()
    public async getAll( @Res() res: Response, @Body() boies: any) {
        let counter = await this._productService.getAll();
        res.status(HttpStatus.OK).json(counter);
    }
}
