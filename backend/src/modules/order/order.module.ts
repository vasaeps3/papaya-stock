import { MiddlewaresConsumer, Module } from "@nestjs/common";

import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { LoggingMiddleware } from "../../middleware/logging.middleware";
import { AuthorizeMiddleware } from "../../middleware/authorize.middleware";
import { SettingService } from "../setting/setting.service";
import { SettingModule } from "../setting/setting.module";
import { CommonService } from "../../common/common.service";
import { CommonModule } from "../../common/common.module";


@Module({
    modules: [SettingModule, CommonModule],
    controllers: [OrderController],
    components: [OrderService, { provide: [SettingService, CommonService] }]
})
export class OrderModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthorizeMiddleware)
            .forRoutes(OrderController)
            .apply(LoggingMiddleware)
            .forRoutes(OrderController);
    }
}

