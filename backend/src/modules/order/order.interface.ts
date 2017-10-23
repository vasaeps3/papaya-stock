import { IProduct } from "../product/product.interface";

export interface IStockOrder {
    meta: {
        href: string;
    };
    id: string;
    name: string;
    sum: number;
    reservedSum: number;
    state: {
        name: string;
        color: number;
    };
    updated: Date;
    created: Date;
}

export interface IOrder {
    id?: string;
    name?: string;
    sum?: number;
    reservedSum?: number;
    quantity?: number;
    description?: string;
    state?: {
        name?: string;
        color?: number;
    };
    updated?: Date;
    created?: Date;
    products?: IProduct[];
}
