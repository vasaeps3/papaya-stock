import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CartService } from "./cart.service";
import { CartComponent } from "./cart.component";
import { PositionsModule } from "../components/positions/positions.module";
import { CartRoutingModule } from "./cart-routing.module";


@NgModule({
    imports: [
        CommonModule,
        // NgbCarouselModule.forRoot(),
        // NgbAlertModule.forRoot(),
        CartRoutingModule,
        PositionsModule
    ],
    declarations: [
        CartComponent
    ],
    providers: [CartService]
})
export class CartModule { }
