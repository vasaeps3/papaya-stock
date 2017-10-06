import { PositionComponent } from './components/positions/position/position.component';
import { PositionsComponent } from './components/positions/positions.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminComponent } from "./admin.component";
import { HeaderComponent } from "./components/header/header.component";
import { PositionsService } from "./components/positions/position.service";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AdminRoutingModule } from "./admin-routing.module";


@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule
    ],
    declarations: [
        AdminComponent,
        HeaderComponent,
        SidebarComponent
    ],
    providers: [PositionsService]
})
export class AdminModule { }
