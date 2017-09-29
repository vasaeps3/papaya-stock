import { DashboardService } from './dashboard.service';
import { Component, OnInit } from "@angular/core";


@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
    counterparties: any;
    constructor(
        private _dashboardService: DashboardService
    ) { }

    ngOnInit() {
        this._dashboardService.getAllCounter().subscribe(
            result => {
                this.counterparties = result;
            }
        );
    }
}