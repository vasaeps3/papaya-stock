import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "position-comp",
    templateUrl: "./position.component.html",
    styleUrls: ["./position.component.scss"]
})
export class PositionComponent {
    @Input() public position: any;
    @Output() public onChangePositionQuantity = new EventEmitter<string>();

    public changeQuantity(increased: boolean) {
        let oldQuantity = this.position.quantity;
        increased == true ? this.position.quantity++ : this.position.quantity == 0 ? 0 : this.position.quantity--;
        if (oldQuantity !== this.position.quantity) {
            this.onChangePositionQuantity.emit(this.position.id);
        }

    }
}
