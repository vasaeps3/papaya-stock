import { HttpException } from "@nestjs/core";
import { Component, OnModuleInit } from "@nestjs/common";
import { createConnection, Connection, EntityManager, Repository, ObjectType, Entity } from "typeorm";

import { DatabaseConfig } from "./database.config";


@Component()
export class DatabaseService implements OnModuleInit {

    private _connection: Connection;

    constructor(private readonly databaseConfig: DatabaseConfig) { }

    public async onModuleInit() {
        this._connection = await createConnection(this.databaseConfig.getConfiguration());
    }

    private get connection(): Connection {
        return this._connection;
    }

    public async getEntityManager(): Promise<EntityManager> {
        return (await this.connection).entityManager;
    }

    public async getRepository<T>(entityClassOrName: ObjectType<T> | string): Promise<Repository<T>> {
        return (await this.connection).getRepository<T>(entityClassOrName);
    }
}
