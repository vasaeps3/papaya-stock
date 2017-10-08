import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { RegisterComponent } from "./register.component";
import { RegisterRoutingModule } from "./register-routing.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RegisterRoutingModule
    ],
    declarations: [RegisterComponent]
})
export class RegisterModule {
}
