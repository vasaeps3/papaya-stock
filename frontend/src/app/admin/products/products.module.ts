import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ProductsService } from "./products.service";
import { IPosition, PositionsService } from '../components/positions/position.service';
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { PositionComponent } from "../components/positions/position/position.component";
import { PositionsComponent } from "../components/positions/positions.component";


@NgModule({
    imports: [
        CommonModule,
        // NgbCarouselModule.forRoot(),
        // NgbAlertModule.forRoot(),
        ProductsRoutingModule
    ],
    declarations: [
        ProductsComponent,
        PositionsComponent,
        PositionComponent
    ],
    providers: [ProductsService, PositionsService],
})
export class ProductsModule { }
