import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "variants-comp",
    template: `<h2>Добро пожаловать {{variants}}!</h2>{{variants|json}}<br/>
    <button (click)="onClickChange(fasle)">+</button>
    <button (click)="onClickChange(true)">-</button>`,
    styles: [`h2, p {color:red;}`]
})
export class VariantsComponent {
    @Input() variants: any;
    @Output() onChangeHuy = new EventEmitter<boolean>();
    name = "Евгений";


    onClickChange(increased: boolean) {
        this.variants[0].id = "12";
        this.onChangeHuy.emit(this.variants);
    }
}