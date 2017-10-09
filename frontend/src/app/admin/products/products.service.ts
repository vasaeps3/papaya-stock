import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


@Injectable()
export class ProductsService {
    constructor(
        private _httpClient: HttpClient
    ) { }

    public getAll(): Observable<any> {
        // const headers = new HttpHeaders({ "Content-Type": "application/json" });
        // const options = { headers: headers };
        return this._httpClient.get("/api/product/");
    }
}
