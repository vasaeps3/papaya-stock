import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Res } from "@nestjs/common";

import { CounterService } from './counter.service';


@Controller("counter")
export class CounterController {
    constructor(private _counterService: CounterService) {

    }

    @Get()
    public getAll( @Res() res: Response, @Body() boies: any) {
        this._counterService.getAll();
        console.log("12");
        res.status(HttpStatus.OK).json({ "id": "as" });
        // if (user.password) {
        //     user.password = this.encryptPassword(user.password);
        // }
        // let createdUser: User = await this._userService.add(user);
        // res.status(HttpStatus.OK).json(createdUser);
    }
}
