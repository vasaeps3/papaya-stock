import { CKEditorModule } from "ng2-ckeditor";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SettingService } from "./setting.service";
import { SettingComponent } from "./setting.component";
import { SettingRoutingModule } from "./setting-routing.module";
import { SettingResolverService } from "./setting-resolve.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CKEditorModule,
        SettingRoutingModule
    ],
    declarations: [
        SettingComponent
    ],
    providers: [
        SettingResolverService,
        SettingService
    ]
})
export class SettingModule { }