import { MiddlewaresConsumer, Module } from "@nestjs/common";

import { CommonModule } from "../../common/common.module";
import { CommonService } from "../../common/common.service";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { LoggingMiddleware } from "../../middleware/logging.middleware";
import { AuthorizeMiddleware } from "../../middleware/authorize.middleware";


@Module({
    modules: [CommonModule],
    controllers: [ProductController],
    components: [ProductService, { provide: CommonService }]
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
