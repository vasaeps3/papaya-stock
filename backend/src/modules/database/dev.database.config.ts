import { Component } from "@nestjs/common";
import { ConnectionOptions } from "typeorm";

import { User } from "../user/user.entity";
import { DatabaseConfig } from "./database.config";


@Component()
export class DevDatabaseConfig extends DatabaseConfig {
    public getConfiguration(): ConnectionOptions {
        return {
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
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
