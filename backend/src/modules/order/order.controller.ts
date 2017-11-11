import * as _ from "lodash";
import * as bluebird from "bluebird";
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res } from "@nestjs/common";

import { OrderService } from "./order.service";
import { IOrder, IStockOrder } from "./order.interface";
import { IPosition, IProduct } from "../product/product.interface";
import { SettingService } from "../setting/setting.service";


@Controller("order")
export class OrderController {

    constructor(
        private _orderService: OrderService,
        private _settingService: SettingService
    ) { }

    @Get("get")
    public async getOrderById( @Req() req: Request, @Res() res: Response, @Query() query?: any) {
        let orderId = query.id;
        let positionsFromOrder: any = await this._orderService.getPositionsByOrder(orderId);
        let products: IProduct[] = [];
        let product: IProduct;
        let quantityItemOrder: number = 0;
        _.each(positionsFromOrder, function (positionFromOrder: any) {
            product = _.find(products, function (o) {
                return product.id == positionFromOrder.assortment.product.id;
            });
            if (!product) {
                product = {
                    id: positionFromOrder.assortment.product.id,
                    name: positionFromOrder.assortment.product.name,
                    image: positionFromOrder.assortment.product.image && positionFromOrder.assortment.product.image.miniature.href || null,
                    article: positionFromOrder.assortment.product.article,
                    salePrice: positionFromOrder.price,
                    quantity: 0,
                    positions: []
                };
                products.push(product);
            }
            let position: IPosition = {
                id: positionFromOrder.assortment.id,
                salePrice: positionFromOrder.price,
                size: +positionFromOrder.assortment.name.match(/\(([^\]]+)\)/ig).map(n => n.slice(1, -1))[0],
                quantity: positionFromOrder.quantity
            };
            product.quantity += positionFromOrder.quantity;
            product.positions.push(position);
            quantityItemOrder += positionFromOrder.quantity;
        });
        products = await this.loadImages(products);

        let order: IOrder = await this._orderService.getOrderById(orderId);
        order = _.pick(order, ["id", "name", "sum", "reservedSum", "state", "updated", "created", "description"]);
        order.state = {
            name: order.state.name,
            color: order.state.color
        };
        order.quantity = quantityItemOrder;
        order.products = products;
        res.status(HttpStatus.OK).json(order);
    }

    @Get()
    public async getAll( @Req() req: Request, @Res() res: Response) {
        let agentId: string = req["token"].stockId || null;
        let stockOrders: IStockOrder[] = await this._orderService.getAll(agentId);
        let orders: IOrder[] = [];
        _.each(stockOrders, function (stockOrder) {
            console.log(stockOrder.sum);
            let order: IOrder = {
                id: stockOrder.id,
                name: stockOrder.name,
                sum: stockOrder.sum,
                description: stockOrder.description || null,
                reservedSum: stockOrder.reservedSum,
                state: {
                    name: stockOrder.state.name,
                    color: stockOrder.state.color
                },
                created: stockOrder.created,
                updated: stockOrder.updated
            };
            orders.push(order);
        });
        res.status(HttpStatus.OK).json(orders);
    }

    @Post()
    public async createOrder( @Req() req: Request, @Res() res: Response, @Body() body: any) {
        let products: Array<IProduct> = body.products;
        let agentId = req["token"].stockId || null;
        if (req["token"].isAdmin) {
            agentId = body.agentId || null;
        }
        let organizationId = await this._orderService.getOrganizationId();
        let lastOrder = await this._orderService.getLastOrder();
        let descriptionOrder = await this._settingService.getOnly("orderComment");
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
            "description": descriptionOrder && descriptionOrder.value || null,
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

    private loadImages(products: IProduct[]) {
        let _orderService = this._orderService;
        return bluebird.Promise.map(products, function (product) {
            return _orderService.loadImage(product);
        }).then(function (result) {
            return result;
        });
    }

}
