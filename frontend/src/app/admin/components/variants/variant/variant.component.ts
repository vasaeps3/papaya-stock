import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "variant-comp",
    templateUrl: "./variant.component.html",
    styleUrls: ["./variant.component.scss"]
})
export class VariantComponent {
    @Input() position: any;
    @Output() onChangePositionQuantity = new EventEmitter<string>();

    public changeQuantity(increased: boolean) {
        increased == true ? this.position.quantity++ : this.position.quantity == 0 ? 0 : this.position.quantity--;
        this.onChangePositionQuantity.emit(this.position.id);
    }
}