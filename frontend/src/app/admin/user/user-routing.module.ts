import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminGuard } from "../../_auth/admin.guard";
import { UserComponent } from "./user.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { AllUsersResolverService } from "./all-users-resolve.service";


const routes: Routes = [
    { path: "", component: UserComponent, canActivate: [AdminGuard] },
    {
        path: "changePassword",
        component: ChangePasswordComponent,
        resolve: { users: AllUsersResolverService }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
