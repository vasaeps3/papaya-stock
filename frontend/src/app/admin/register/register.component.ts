import { Component, OnInit } from "@angular/core";
import { NgForm} from "@angular/forms";



@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
    public model: any = {};
    public clas: string = "has-success";

    public ngOnInit() {

        console.log("this.model");
        console.log(this.model);
    }
    public register(registerForm: NgForm) {
        //console.log(registerForm.control);
    }
    public onEmailChange() {
        console.log(this.model.email);
    }
}