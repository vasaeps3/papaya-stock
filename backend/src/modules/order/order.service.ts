import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";

import * as request from "request-promise";


@Component()
export class OrderService {
    public options = {
        uri: "https://online.moysklad.ru/api/remap/1.1/entity/customerorder",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic  YWRtaW5Aa2FsaW5vZmZza2kxOjA1NGFmMjkwNTU="
        }
    };
    constructor() { }

    public async getAll() {
        let orders = JSON.parse(await request(this.options));
        return _.map(orders.rows, order => _.pick(order, ["name", "moment", "sum", "reservedSum"]));
    }
}
