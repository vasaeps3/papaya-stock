import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";

import * as request from "request-promise";
import { OPTIONS } from "../../common/base.service";

@Component()
export class OrderService {

    constructor() { }

    public async getAll(agentId: string) {
        let options = _.cloneDeep(OPTIONS);
        options.uri += "/entity/customerorder?order=created&direction=desc&expand=state";
        if (agentId) {
            options.uri += "&filter=agent=https://online.moysklad.ru/api/remap/1.1/entity/counterparty/" + agentId;
        }

        return JSON.parse(await request(options)).rows;
    }

    public async getOrganizationId() {
        let options = _.cloneDeep(OPTIONS);
        options.uri += "/entity/organization";
        let organization = JSON.parse(await request(options)).rows[0];

        return organization.id;
    }

    public async getLastOrder() {
        let options = _.cloneDeep(OPTIONS);
        options.uri += "/entity/customerorder?order=created&direction=desc&limit=1";
        let lastOrder = JSON.parse(await request(options)).rows;

        return lastOrder;
    }

    public async createOrder(body) {
        let options = _.cloneDeep(OPTIONS);
        options.uri += "/entity/customerorder";
        options.method = "POST";
        options.body = JSON.stringify(body);
        let newOrder = JSON.parse(await request(options));

        return newOrder;
    }
}
