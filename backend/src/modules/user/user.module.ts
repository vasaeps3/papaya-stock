import * as _ from "lodash";
import { Module, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";

import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseConfig } from "../database/database.config";
import { DatabaseModule } from "../database/database.module";
import { DevDatabaseConfig } from "../database/dev.database.config";


@Module({
    modules: [DatabaseModule],
    controllers: [UserController],
    components: [
        UserService,
        { provide: DatabaseConfig, useClass: DevDatabaseConfig }
    ],
})
export class UserModule { }

