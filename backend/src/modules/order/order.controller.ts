import * as _ from "lodash";
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";

import { IProduct } from "../product/product.interface";
import { OrderService } from "./order.service";
import { IOrder, IStockOrder } from "./order.interface";


@Controller("order")
export class OrderController {
    constructor(
        private _orderService: OrderService
    ) { }

    @Get()
    public async getAll( @Req() req: Request, @Res() res: Response) {
        let agentId: string = req["token"].stockId || null;
        let stockOrders: IStockOrder[] = await this._orderService.getAll(agentId);
        let orders: IOrder[] = [];
        _.each(stockOrders, function (stockOrder) {
            let order: IOrder = {
                id: stockOrder.id,
                name: stockOrder.name,
                sum: stockOrder.sum,
                reservedSum: stockOrder.reservedSum,
                state: {
                    name: stockOrder.state.name,
                    color: stockOrder.state.color
                },
                created: stockOrder.created,
                update: stockOrder.update
            };
            orders.push(order);
        });
        res.status(HttpStatus.OK).json(orders);
    }

    @Post()
    public async createOrder( @Req() req: Request, @Res() res: Response, @Body() products: Array<IProduct>) {
        console.log("------------------------------------------------------> ",req["token"]);
        let agentId = req["token"].stockId || null;
        let organizationId = await this._orderService.getOrganizationId();
        let lastOrder = await this._orderService.getLastOrder();
        let lastOrderNum: number = 0;
        let newOrderNum: string;
        if (lastOrder.length) {
            lastOrderNum = +lastOrder[0].name + 1;
            newOrderNum = (Array(5).join("0") + lastOrderNum + "").slice(-5);
        }
        let newOrderBody = {
            "name": newOrderNum,
            "organization": {
                "meta": {
                    "href": "https://online.moysklad.ru/api/remap/1.1/entity/organization/" + organizationId,
                    "type": "organization",
                    "mediaType": "application/json"
                }
            },
            "agent": {
                "meta": {
                    "href": "https://online.moysklad.ru/api/remap/1.1/entity/counterparty/" + agentId,
                    "type": "counterparty",
                    "mediaType": "application/json"
                }
            },
            "positions": []
        };
        _.each(products, function (product) {
            _.each(product.positions, function (position) {
                if (position.quantity > 0) {
                    let positionOrder = {
                        "quantity": position.quantity,
                        "price": product.salePrice,
                        "assortment": {
                            "meta": {
                                "href": "https://online.moysklad.ru/api/remap/1.1/entity/variant/" + position.id,
                                "type": "variant",
                                "mediaType": "application/json"
                            }
                        },
                        "reserve": position.quantity
                    };
                    newOrderBody.positions.push(positionOrder);
                }
            });
        });
        let newOrder = await this._orderService.createOrder(newOrderBody);
        res.status(HttpStatus.OK).json({ "id": newOrder.id });
    }
}
