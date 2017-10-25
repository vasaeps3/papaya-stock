import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { IOrder } from "./orders.component";
import { IProduct } from "../components/positions/position.service";


@Injectable()
export class OrdersService {
    constructor(
        private _httpClient: HttpClient
    ) { }

    public getAllOrders(): Observable<any> {
        return this._httpClient.get("/api/order/");
    }

    public getProductById(productId: Array<IProduct>): Observable<any> {
        return this._httpClient.post("/api/product/", JSON.stringify(productId));
    }

    public getOrderById(orderId: string): Observable<any> {
        return this._httpClient.get("/api/order/get?id=" + orderId);
    }

    public createOrder(products: IProduct[]): Observable<any> {
        console.log(products);
        let qwerty: Observable<any> = this._httpClient.post("/api/order/", JSON.stringify(products));
        return qwerty;
    }
}
