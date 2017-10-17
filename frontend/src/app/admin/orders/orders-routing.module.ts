import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OrdersComponent } from "./orders.component";
import { OrderResolverService } from "./order-resolver.service";
import { OrderDetailComponent } from "./detail/order-detail.component";


const routes: Routes = [
    {
        path: "", component: OrdersComponent
        , resolve: { orders: OrderResolverService }
    },
    { path: ":id", component: OrderDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule { }
