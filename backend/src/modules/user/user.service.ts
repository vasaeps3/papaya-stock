import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";

import { User } from "./user.entity";
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
        return (await this.repository).persist(user);
    }

    public async getByName(nameUser: string): Promise<User> {
        let user: User = await ((await this.repository).findOne({ name: nameUser }));
        if (!user) {
            throw new NotFoundException("User not found!");
        }
        return user;
    }


}
