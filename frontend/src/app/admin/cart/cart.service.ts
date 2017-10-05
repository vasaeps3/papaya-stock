import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


@Injectable()
export class CartService {
    constructor(
        private _httpClient: HttpClient
    ) { }

    public getProductById(productId: Array<string>): Observable<any> {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        const options = { headers: headers };
        return this._httpClient.post("/api/product/", JSON.stringify(productId), options);
    }
}
