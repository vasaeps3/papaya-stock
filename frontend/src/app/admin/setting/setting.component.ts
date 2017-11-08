import * as _ from "lodash";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToasterService } from "angular2-toaster";

import { ISetting } from "./setting.interface";
import { SettingService } from "./setting.service";


@Component({
    selector: "app-setting",
    templateUrl: "./setting.component.html"
})
export class SettingComponent implements OnInit {
    public setting: ISetting[];
    public loginStock: ISetting;
    public passwordStock: ISetting;
    public cartText: ISetting;
    public productText: ISetting;
    public orderComment: ISetting;

    constructor(
        private _activatedRouter: ActivatedRoute,
        private _settingService: SettingService,
        private _toasterServise: ToasterService
    ) { }

    public ngOnInit() {
        this._activatedRouter.data.subscribe(
            data => {
                this.setting = data["setting"];
                this.loginStock = _.find(this.setting, (o) => o.code === "loginStock");
                this.passwordStock = _.find(this.setting, (o) => o.code === "passwordStock");
                this.cartText = _.find(this.setting, (o) => o.code === "cartText");
                this.productText = _.find(this.setting, (o) => o.code === "productText");
                this.orderComment = _.find(this.setting, (o) => o.code === "orderComment");
            }
        );
    }

    public saveAll() {
        this._settingService.setSetting(this.setting).subscribe(
            result => {
                this._toasterServise.pop("success", result.title, result.text);
            },
            error => {
                console.log(error);
            }
        );
    }

}
