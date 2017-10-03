import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ProductsService } from "./products.service";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { VariantsComponent } from "../components/variants/variants.component";


@NgModule({
    imports: [
        CommonModule,
        // NgbCarouselModule.forRoot(),
        // NgbAlertModule.forRoot(),
        ProductsRoutingModule
    ],
    declarations: [
        ProductsComponent,
        VariantsComponent
    ],
    providers: [ProductsService],
})
export class ProductsModule { }
