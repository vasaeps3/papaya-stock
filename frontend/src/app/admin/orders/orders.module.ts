import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OrdersService } from "./orders.service";
import { OrdersComponent } from "./orders.component";
import { OrdersRoutingModule } from "./orders-routing.module";
import { OrderDetailComponent } from "./detail/order-detail.component";
import { OrderResolverService } from "./order-resolver.service";


@NgModule({
    imports: [
        CommonModule,
        // NgbCarouselModule.forRoot(),
        // NgbAlertModule.forRoot(),
        OrdersRoutingModule
    ],
    declarations: [
        OrdersComponent,
        OrderDetailComponent
    ],
    providers: [
        OrdersService,
        OrderResolverService
    ]
})
export class OrdersModule { }
