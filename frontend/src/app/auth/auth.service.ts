import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { IUser } from "./user.interface";


@Injectable()
export class AuthService {

    public currentUser: IUser;

    constructor(private _httpClient: HttpClient) {
    }

    public isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    public getTestData(): Observable<any> {
        return this._httpClient.get("/api/roles")
            .map((resp: Response) => {
                return resp;
            });
    }

    public login(userName: string, password: string): Observable<any> {
        const body = JSON.stringify({ name: userName, password: password });
        console.log("-----login--------");
        console.log(body);
        let headers = new HttpHeaders({ "Content-Type": "application/json;charset=utf-8" });
        return this._httpClient.post("/api/user/login", body, { headers: headers });
    }

    public logout(): void {
        this.currentUser = null;
    }
}
