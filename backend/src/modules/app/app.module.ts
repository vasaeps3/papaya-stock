
import { Module } from "@nestjs/common";

// import { AuthModule } from "../auth/auth.module";
// import { RoleModule } from "../roles/role.module";
import { UserModule } from "../user/user.module";
import { CounterpartyModule } from "../counterparty/counterparty.module";
import { OrderModule } from "../order/order.module";
// import { AuthService } from "../auth/auth.service";
// import { CategoryModule } from "../categories/category.module";


@Module({
    modules: [
        UserModule,
        CounterpartyModule,
        OrderModule
    ],
})
export class ApplicationModule { }
