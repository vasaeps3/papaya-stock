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
    update: Date;
    created: Date;
}

export interface IOrder {
    id: string;
    name: string;
    sum: number;
    reservedSum: number;
    state: {
        name: string;
        color: number;
    };
    update: Date;
    created: Date;
}
