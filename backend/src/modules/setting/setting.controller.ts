import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Post, Req, Res, Query } from "@nestjs/common";

import { Setting } from "./setting.entity";
import { SettingService } from "./setting.service";


@Controller("setting")
export class SettingController {

    constructor(
        protected _settingService: SettingService
    ) { }

    @Get("get")
    public async getOnly( @Req() req: Request, @Res() res: Response, @Query() query?: any) {
        let settingCode = query.setting;
        let settingValue = await this._settingService.getOnly(settingCode);
        res.status(HttpStatus.OK).json(settingValue);
    }

    @Get()
    public async getAll( @Req() req: Request, @Res() res: Response) {
        let settings: Setting[] = await this._settingService.getSetting();
        res.status(HttpStatus.OK).json(settings);
    }

    @Post()
    public async create( @Res() res: Response, @Body() settings: Setting[]) {
        let newSettings: Setting[] = await this._settingService.setSetting(settings);
        res.status(HttpStatus.OK).json(newSettings);
    }

}
