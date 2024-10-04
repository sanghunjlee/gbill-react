
export interface Bill {
    id: string;
    description: string;
    amount: number;
    tax: number;
    tip?: number;
    payerId: string;
    items: BillItem[];
}

export interface BillItem {
    id: string;
    billId: string;
    order: number;
    description: string;
    amount: number;
    ordererIds: string[];
}

