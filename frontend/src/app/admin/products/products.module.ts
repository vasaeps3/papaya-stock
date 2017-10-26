import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { ProductsService } from "./products.service";
import { PositionsModule } from "../components/positions/positions.module";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products-routing.module";


@NgModule({
    imports: [
        CommonModule,
        // NgbCarouselModule.forRoot(),
        // NgbAlertModule.forRoot(),
        ProductsRoutingModule,
        PositionsModule,
        InfiniteScrollModule
    ],
    declarations: [
        ProductsComponent
    ],
    providers: [ProductsService],
})
export class ProductsModule { }
