import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CartService } from "./cart.service";
import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./cart.component";


@NgModule({
    imports: [
        CommonModule,
        // NgbCarouselModule.forRoot(),
        // NgbAlertModule.forRoot(),
        CartRoutingModule
    ],
    declarations: [
        CartComponent
    ],
    providers: [CartService]
})
export class CartModule { }
