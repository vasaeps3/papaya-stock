import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OrdersComponent } from "./orders.component";
import { OrderDetailComponent } from "./detail/order-detail.component";


const routes: Routes = [
    { path: "", component: OrdersComponent },
    { path: ":id", component: OrderDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule { }
