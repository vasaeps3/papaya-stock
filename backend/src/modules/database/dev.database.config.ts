import { Component } from "@nestjs/common";
import { ConnectionOptions } from "typeorm";

import { User } from "../user/user.entity";
import { DatabaseConfig } from "./database.config";


@Component()
export class DevDatabaseConfig extends DatabaseConfig {
    public getConfiguration(): ConnectionOptions {
        return {
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "papayastock",
            entities: [
                User
            ],
            autoSchemaSync: true,
            logger: "advanced-console",
            logging: "all",
        };
    }
}
