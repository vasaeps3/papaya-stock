import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "variants-comp",
    templateUrl: "./variants.component.html",
    styleUrls: ["./variants.component.scss"]
})
export class VariantsComponent {
    @Input() positions: any;
    @Output() onChangeHuy = new EventEmitter<string>();

    public onChangePositionQuantity(positionId: string) {
        this.onChangeHuy.emit(positionId);
        console.log(positionId);
    }
}