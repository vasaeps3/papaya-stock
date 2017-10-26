import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminGuard } from "../../_auth/admin.guard";
import { UserComponent } from "./user.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ChangePasswordResolverService } from "./change-password/change-password-resolve.service";


const routes: Routes = [
    { path: "", component: UserComponent, canActivate: [AdminGuard] },
    { path: "changePassword", component: ChangePasswordComponent, resolve: { users: ChangePasswordResolverService }, }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
