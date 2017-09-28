import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";


const routes: Routes = [
    {
        path: "", component: AdminComponent,
        children: [
            { path: "dashboard", loadChildren: "./dashboard/dashboard.module#DashboardModule" },
            //{ path: "tables", loadChildren: "./tables/tables.module#TablesModule" },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
