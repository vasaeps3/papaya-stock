import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";

import * as request from "request-promise";
import { OPTIONS } from "../../common/base.service";

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

    public async getOrganizationId() {
        let options = _.cloneDeep(OPTIONS);
        options.uri = "https://online.moysklad.ru/api/remap/1.1/entity/organization";
        let organization = JSON.parse(await request(options)).rows[0];
        return organization.id;
    }

    public async getLastOrder() {
        let options = OPTIONS;
        options.uri = "https://online.moysklad.ru/api/remap/1.1/entity/customerorder?order=moment&direction=desc&limit=1";
        let lastOrder = JSON.parse(await request(options)).rows;
        return lastOrder;
    }

    public async createOrder(body) {
        let options = _.cloneDeep(OPTIONS);
        options.uri = "https://online.moysklad.ru/api/remap/1.1/entity/customerorder";
        options.method = "POST";
        options.body = JSON.stringify(body);
        let newOrder = JSON.parse(await request(options));
        return newOrder;
    }


}
