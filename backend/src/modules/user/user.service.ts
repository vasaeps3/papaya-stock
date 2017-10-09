import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import * as request from "request-promise";

import { User } from "./user.entity";
import { OPTIONS } from "../../common/base.service";
import { DatabaseService } from "../database/database.service";
import { NotFoundException } from "../../exception/not-found.exception";


@Component()
export class UserService {
    constructor(private _databaseService: DatabaseService) {
    }

    protected get repository(): Promise<Repository<User>> {
        return this._databaseService.getRepository(User);
    }

    public async add(user: User): Promise<User> {
        return (await this.repository).persist(user).catch(error => {
            console.log("---------------------------------------");
            console.log(error);
            throw new NotFoundException("Пользователь уже зарегистрирован в системе!");
        });
    }

    public async getByName(nameUser: string): Promise<User> {
        let user: User = await ((await this.repository).findOne({ name: nameUser }));
        if (!user) {
            throw new NotFoundException("User not found!");
        }
        return user;
    }

    public async getStocksUserByEmail(email: string) {
        let options = OPTIONS;
        options.uri = "https://online.moysklad.ru/api/remap/1.1/entity/counterparty?filter=email=" + email;
        let users = JSON.parse(await request(options)).rows;
        return users;
    }


}
