import { MiddlewaresConsumer, Module } from "@nestjs/common";

import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { LoggingMiddleware } from "../../middleware/logging.middleware";
import { AuthorizeMiddleware } from "../../middleware/authorize.middleware";


@Module({
    controllers: [OrderController],
    components: [OrderService]
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

