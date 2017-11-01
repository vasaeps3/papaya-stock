import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CartComponent } from "./cart.component";
import { CartResolverService } from "./cart-resolver.service";
import { AllUsersResolverService } from "../user/all-users-resolve.service";



const routes: Routes = [
    { path: "", component: CartComponent, resolve: { products: CartResolverService, users: AllUsersResolverService } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule { }
