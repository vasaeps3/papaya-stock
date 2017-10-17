import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { UserComponent } from "./user.component";
import { UserRoutingModule } from "./user-routing.module";
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        UserRoutingModule
    ],
    declarations: [
        UserComponent, ChangePasswordComponent
    ]
})
export class UserModule {
}
