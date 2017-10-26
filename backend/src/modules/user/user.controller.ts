import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { Response, Request } from "express";
import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from "@nestjs/common";

import { User } from "./user.entity";
import { UserService } from "./user.service";
import { NotFoundException } from "../../exception/not-found.exception";
import { NotAcceptableException } from "../../exception/not-acceptable.exception";


@Controller("user")
export class UserController {

    constructor(
        protected _userService: UserService
    ) { }

    @Get()
    public async getAll( @Req() req: Request, @Res() res: Response) {
        let users: User[] = await this._userService.getAll();
        res.status(HttpStatus.OK).json(users);
    }

    @Get("reload")
    public async reload( @Req() req: Request, @Res() res: Response) {
        res.status(HttpStatus.OK).json(_.pick(req["token"], ["name", "isAdmin"]));
    }

    @Post("register")
    public async create( @Res() res: Response, @Body() user: User) {
        let usersStock: any[] = await this._userService.getStocksUserByEmail(user.name);
        if (usersStock.length === 0) {
            throw new NotFoundException(`Не найден пользователь с e-mail "${user.name}" в системе МойСклад!`);
        }
        if (usersStock.length > 1) {
            throw new NotFoundException(`Найдено несколько пользователей с e-mail "${user.name}" в системе МойСклад!`);
        }
        let newUser: User = user;
        newUser.stockId = usersStock[0].id;
        newUser.password = this.encryptPassword(newUser.password);
        let createdUser: User = await this._userService.add(newUser);
        res.status(HttpStatus.OK).json(createdUser);
    }

    @Post("authenticate")
    public async login( @Res() res: Response, @Body() user: User) {
        let foundUser: User = await this._userService.getByName(user.name);
        if (foundUser.password !== this.encryptPassword(user.password)) {
            throw new NotFoundException("Incorrect password");
        }
        let authUser: Partial<User> = _.pick(foundUser, ["id", "name", "isAdmin", "stockId"]);
        let tokenLocale = jwt.sign(authUser, "stockpapaya", { noTimestamp: true });
        res.status(HttpStatus.OK).json({ user: _.omit(authUser, ["id", "stockId"]), token: tokenLocale });
    }

    private encryptPassword(password): string {
        return crypto.createHash("sha1").update(password).digest("hex");
    }
}
