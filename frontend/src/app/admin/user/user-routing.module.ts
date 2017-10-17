import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserComponent } from "./user.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";


const routes: Routes = [
    { path: "", component: UserComponent },
    { path: "changePassword", component: ChangePasswordComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
