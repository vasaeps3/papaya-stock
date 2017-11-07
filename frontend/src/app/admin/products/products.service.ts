import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


@Injectable()
export class ProductsService {
    constructor(
        private _httpClient: HttpClient
    ) { }

    public getAll(limit?: number, offset?: number): Observable<any> {
        let limitStr = "";
        if (limit) {
            limitStr = "?limit=" + limit + "&offset=" + offset;
        }

        return this._httpClient.get("/api/product/" + limitStr);
    }
}
