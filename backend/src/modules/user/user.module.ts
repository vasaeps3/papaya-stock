import * as _ from "lodash";
import { Module, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";

import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { DatabaseConfig } from "../database/database.config";
import { DatabaseModule } from "../database/database.module";
import { LoggingMiddleware } from "../../middleware/logging.middleware";
import { DevDatabaseConfig } from "../database/dev.database.config";
import { AuthorizeMiddleware } from "../../middleware/authorize.middleware";


@Module({
    modules: [DatabaseModule],
    controllers: [UserController],
    components: [
        UserService,
        { provide: DatabaseConfig, useClass: DevDatabaseConfig }
    ],
})
export class UserModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthorizeMiddleware)
            .forRoutes(
            { path: "/user/register", method: RequestMethod.POST },
            { path: "/user/reload", method: RequestMethod.GET },
            { path: "/user/", method: RequestMethod.GET },
            { path: "/user/changepassword", method: RequestMethod.POST }
            )
            .apply(LoggingMiddleware)
            .forRoutes(UserController);
    }
}

