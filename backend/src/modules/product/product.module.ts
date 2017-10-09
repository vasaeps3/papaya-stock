import { MiddlewaresConsumer, Module } from "@nestjs/common";

import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { LoggingMiddleware } from "../../middleware/logging.middleware";
import { AuthorizeMiddleware } from "../../middleware/authorize.middleware";


@Module({
    controllers: [ProductController],
    components: [ProductService]
})
export class ProductModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthorizeMiddleware)
            .forRoutes(ProductController)
            .apply(LoggingMiddleware)
            .forRoutes(ProductController);
    }
}
