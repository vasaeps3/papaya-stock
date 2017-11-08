import { EntityManager, Repository } from "typeorm";
import { Component } from "@nestjs/common";

import { Setting } from "./setting.entity";
import { DatabaseService } from "../database/database.service";


@Component()
export class SettingService {

    constructor(
        private _databaseService: DatabaseService
    ) { }

    protected get repository(): Promise<Repository<Setting>> {
        return this._databaseService.getRepository(Setting);
    }

    protected get entityManager(): Promise<EntityManager> {
        return this._databaseService.getEntityManager();
    }

    public async getSetting(): Promise<Setting[]> {
        return (await this.repository).find({ select: ["id", "code", "value"] });
    }

    public async setSetting(settings: Setting[]): Promise<Setting[]> {
        return (await this.repository).save(settings);
    }

    public async getOnly(settingCode: string): Promise<Setting> {
        return (await this.repository).findOne({ select: ["value"], where: { code: settingCode } });
    }

}
