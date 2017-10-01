import { Module } from "@nestjs/common";

// import { AuthModule } from "../auth/auth.module";
// import { RoleModule } from "../roles/role.module";
import { UserModule } from "../user/user.module";
import { OrderModule } from "../order/order.module";
import { ProductModule } from "../product/product.module";
import { CounterpartyModule } from "../counterparty/counterparty.module";
// import { AuthService } from "../auth/auth.service";
// import { CategoryModule } from "../categories/category.module";


@Module({
    modules: [
        UserModule,
        CounterpartyModule,
        OrderModule,
        ProductModule
    ],
})
export class ApplicationModule { }
