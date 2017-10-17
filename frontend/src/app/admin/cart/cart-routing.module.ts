import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CartComponent } from "./cart.component";
import { CartResolverService } from './cart-resolver.service';


const routes: Routes = [
    { path: "", component: CartComponent, resolve: { products: CartResolverService } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule { }
