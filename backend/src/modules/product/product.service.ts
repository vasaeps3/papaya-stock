import * as _ from "lodash";
import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import * as request from "request-promise";

import { OPTIONS } from "../../common/base.service";


export class IProduct {
    public id: string;
    public description: string;
    public article: string;
    public variants: IVariant[];
}
export class IVariant {
    public id: string;
    public quantity: number;
    public name: string;
    public code: string;
    public article: string;
    public salePrise: number;
}

@Component()
export class ProductService {

    // 1) Получаем остатки склада по товарам: https://online.moysklad.ru/api/remap/1.1/report/stock/all?groupBy=product&stockMode=positiveOnly
    // на выходе имеем
    // ID product которые не пустые product.id
    // 6a9b8a62-a368-11e7-7a69-971100035502 <-- Джемпер 1167   (14) штук
    // 3d460faf-a368-11e7-6b01-4b1d0006cbcc <-- Комплект 1186  (24) штук
    // 1aae5e56-a368-11e7-7a69-9711000342e3 <-- Платье папаи   (9)  штук

    // 2) Получаем остатки склада по вариантам:
    // https://online.moysklad.ru/api/remap/1.1/report/stock/all?groupBy=variant&product.id=6a9b8a62-a368-11e7-7a69-971100035502&product.id=3d460faf-a368-11e7-6b01-4b1d0006cbcc2&includeRelated=true
    // на выходе имеем
    // ID variant которые не пустые variant.id
    // 6a9e5405-a368-11e7-7a69-971100035507 <-- Джемпер 1167 (42) (4)
    // 6aa01b82-a368-11e7-7a69-97110003550b <-- Джемпер 1167 (44) (2)
    // 6aa1bd9b-a368-11e7-7a69-97110003550f <-- Джемпер 1167 (46) (4)
    // 8673df8a-a368-11e7-7a69-8f5500031557 <-- Джемпер 1167 (48) (4)
    // ..... И т.д. Факт в том что несколько ID товара он скушал

    // 3) Нужно получить описание каждого товара:
    // ???

    // 4) Нужно узнать че за вариант. Пака паршу name. Чисто для тестов

    // Функция возвращает все положительные остатки продуктов
    public async getStockAllProduct() {
        let options = OPTIONS;
        options.uri = "https://online.moysklad.ru/api/remap/1.1/report/stock/all?groupBy=product&stockMode=positiveOnly";
        let products = JSON.parse(await request(options)).rows;
        return products;
    }

    // +
    public async getProductsById(str: string) {
        let options = OPTIONS;
        options.uri = "https://online.moysklad.ru/api/remap/1.1/report/stock/all?stockMode=all" + str;
        console.log("Запрос:" + options.uri);
        return JSON.parse(await request(options)).rows;
    }

    public async getStockProductById(productId: string) {
        let options = OPTIONS;
        options.uri = "https://online.moysklad.ru/api/remap/1.1/report/stock/all?groupBy=product&product.id=" + productId;
        console.log(options.uri);
        let variants = JSON.parse(await request(options)).rows;
        return variants;
    }

    public async getStockAllVariants(str: string) {
        let options = OPTIONS;
        options.uri = "https://online.moysklad.ru/api/remap/1.1/report/stock/all?groupBy=variant&includeRelated=true" + str;
        console.log(options.uri);
        let variants = JSON.parse(await request(options)).rows;
        return variants;
    }

    public async getAll() {
        let options = OPTIONS;
        options.uri = options.uri + "report/stock/all";
        console.log(options.uri);
        let products = JSON.parse(await request(options));
        // let resProducts = {
        //     id
        // }
        // return products;
        // return _.map(products.rows, product => _.pick(product, [
        //     "stock",
        //     "reserve",
        //     "quantity",
        //     "name",
        //     "code",
        //     "article",
        //     "price",
        //     "salePrice",
        //     "uom",
        //     "image"
        // ]
        // ));
        _.each(products.rows, function (product: any) {
            console.log(product.article);
        });
        return products.rows;
    }
}
