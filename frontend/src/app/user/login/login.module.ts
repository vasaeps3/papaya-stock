import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { AuthService } from "../../auth/auth.service";
import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        LoginRoutingModule
    ],
    declarations: [LoginComponent],
    providers: [AuthService, HttpClient]
})
export class LoginModule {
}
