import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Res } from "@nestjs/common";

import { OrderService } from "./order.service";


@Controller("order")
export class OrderController {
    constructor(private _orderService: OrderService) {

    }

    @Get()
    public async getAll( @Res() res: Response, @Body() boies: any) {
        let counter = await this._orderService.getAll();
        res.status(HttpStatus.OK).json(counter);
    }
}
