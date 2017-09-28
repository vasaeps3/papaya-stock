import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AuthService } from './_auth/auth.service';
import { AppComponent } from "./app.component";
import { AppRoutergModule } from "./app-routing.module";


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutergModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [AuthService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
