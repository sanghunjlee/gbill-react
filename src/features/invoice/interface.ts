import type { Bill } from "@src/features/bill/interface";
import type { Person } from "@src/features/person/interface";

export interface Invoice {
    id: string;
    toId: string;
    fromId: string;
    amount: number;
}

