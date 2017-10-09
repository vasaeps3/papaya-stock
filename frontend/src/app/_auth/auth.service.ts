import { Response } from '@angular/http';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { IUser } from "./user.interface";


@Injectable()
export class AuthService {

    public token: string;

    constructor(private _httpClient: HttpClient) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    public register (username: string, password: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers };
        const body = JSON.stringify({ name: username, password: password });
        return this._httpClient.post("/api/user/register", body, options);
    }

    public login(username: string, password: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers };
        const body = JSON.stringify({ name: username, password: password });
        
        return this._httpClient.post("/api/user/authenticate", body, options);
    }
    
    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    public isLoggedIn(): boolean {
        return !!JSON.parse(localStorage.getItem('currentUser'));
    }

    public isAdmin(): boolean {
        return !!JSON.parse(localStorage.getItem('currentUser'));
    }
}
