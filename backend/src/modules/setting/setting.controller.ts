import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";

import { Setting } from "./setting.entity";
import { SettingService } from "./setting.service";


@Controller("setting")
export class SettingController {

    constructor(
        protected _settingService: SettingService
    ) { }

    @Get()
    public async getAll( @Req() req: Request, @Res() res: Response) {
        let settings: Setting[] = await this._settingService.getSetting();
        res.status(HttpStatus.OK).json(settings);
    }

    @Post()
    public async create( @Res() res: Response, @Body() settings: Setting[]) {
        console.log(settings);
        let newSettings: Setting[] = await this._settingService.setSetting(settings);
        res.status(HttpStatus.OK).json(newSettings);
    }
}

