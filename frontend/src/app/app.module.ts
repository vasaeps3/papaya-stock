import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";

import { AuthGuard } from "./_auth/auth.guard";
import { AuthService } from "./_auth/auth.service";
import { AppComponent } from "./app.component";
import { AppRoutergModule } from "./app-routing.module";
import { HttpInterceptorService } from "./_auth/http-interceptor.service";


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutergModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    AuthService,
    HttpClient,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
