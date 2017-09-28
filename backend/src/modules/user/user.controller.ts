import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";

import { User } from "./user.entity";
import { UserService } from "./user.service";
import { NotFoundException } from "../../exception/not-found.exception";


@Controller("user")
export class UserController {
    constructor(protected _userService: UserService) {
    }

    // @Get("/name/:nameUser")
    // public async getByName( @Res() res: Response, @Param("nameUser") nameUser: string) {
    //     let user: User = await this._userService.getByName(nameUser);
    //     res.status(HttpStatus.OK).json(_.pick(user, ["id", "name", "isAdmin"]));
    // }

    @Post()
    public async create( @Res() res: Response, @Body() user: User) {
        if (user.password) {
            user.password = this.encryptPassword(user.password);
        }
        let createdUser: User = await this._userService.add(user);
        res.status(HttpStatus.OK).json(createdUser);
    }

    @Post("authenticate")
    public async login( @Res() res: Response, @Body() user: User) {
        console.log(user);
        let userAuth: User = await this._userService.getByName(user.name);
        if (userAuth.password !== this.encryptPassword(user.password)) {
            throw new NotFoundException("Incorrect password");
        }
        userAuth = _.pick(userAuth, ["id", "name", "isAdmin"]);
        let tokenLocale = jwt.sign(userAuth, "stockpapaya", { noTimestamp: true });
        res.status(HttpStatus.OK).json({ user: _.omit(userAuth, ["id"]), token: tokenLocale });
    }

    private encryptPassword(password): string {
        return crypto.createHash("sha1").update(password).digest("hex");
    }
}
