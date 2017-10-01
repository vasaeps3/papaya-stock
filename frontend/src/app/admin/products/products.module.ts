import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ProductsService } from "./products.service";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products-routing.module";


@NgModule({
    imports: [
        CommonModule,
        // NgbCarouselModule.forRoot(),
        // NgbAlertModule.forRoot(),
        ProductsRoutingModule
    ],
    declarations: [
        ProductsComponent
    ],
    providers: [ProductsService],
})
export class ProductsModule { }
