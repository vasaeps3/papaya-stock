import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";


const routes: Routes = [
    {
        path: "", component: AdminComponent,
        children: [
            { path: "products", loadChildren: "./products/products.module#ProductsModule" },
            { path: "cart", loadChildren: "./cart/cart.module#CartModule" },
            { path: "dashboard", loadChildren: "./dashboard/dashboard.module#DashboardModule" },
            { path: "orders", loadChildren: "./orders/orders.module#OrdersModule" },
            // { path: "tables", loadChildren: "./tables/tables.module#TablesModule" },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
