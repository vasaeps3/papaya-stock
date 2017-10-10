import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CartComponent } from "./cart.component";
import { OrdersService } from "../orders/orders.service";
import { PositionsModule } from "../components/positions/positions.module";
import { CartRoutingModule } from "./cart-routing.module";


@NgModule({
    imports: [
        CommonModule,
        CartRoutingModule,
        PositionsModule
    ],
    declarations: [
        CartComponent
    ],
    providers: [OrdersService]
})
export class CartModule { }
