import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OrdersService } from "./orders.service";
import { OrdersComponent } from "./orders.component";
import { OrdersRoutingModule } from "./orders-routing.module";


@NgModule({
    imports: [
        CommonModule,
        // NgbCarouselModule.forRoot(),
        // NgbAlertModule.forRoot(),
        OrdersRoutingModule
    ],
    declarations: [
        OrdersComponent
    ],
    providers: [OrdersService],
})
export class OrdersModule { }
