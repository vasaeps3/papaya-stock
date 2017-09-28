import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";

import { request } from "request";

import { MCounter } from "./counter.model";


@Component()
export class CounterService {
    constructor(
        // private _databaseService: DatabaseService
    ) {
    }

    // protected get repository(): Promise<Repository<User>> {
    //     return this._databaseService.getRepository(User);
    // }

    public getAll(): MCounter {
        request.get("http://www.google.com", function (error, response, body) {
            console.log("error:", error); // Print the error if one occurred
            console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
            console.log("body:", body); // Print the HTML for the Google homepage.
        });
        let test: MCounter = { name: "Tre", email: "asas" };
        return test;
    }

    // public async getByName(nameUser: string): Promise<User> {
    //     let user: User = await ((await this.repository).findOne({ name: nameUser }));
    //     if (!user) {
    //         throw new NotFoundException("User not found!");
    //     }
    //     return user;
    // }


}
