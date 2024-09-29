import type { Person } from "@src/features/person/interface";

export interface Bill {
    id: string;
    description: string;
    amount: number;
    tip?: number;
    payer: Person;
    items: BillItem[];
}

export interface BillItem {
    id: string;
    order: number;
    description: string;
    amount: number;
    orderers: Person[];
}

