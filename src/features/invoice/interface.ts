import { Person } from "@features/person/interface";

export interface Invoice {
    id: string;
    toId: string;
    fromId: string;
    amount: number;
}

export interface IWeeb {
    id: string; // personId
    profit: number;
    debt: number;
    refinance: () => void;
}

export class Weeb implements IWeeb {
    id: string;
    profit: number;
    debt: number;
    
    constructor(args: {id: string, profit?: number, debt?: number}) {
        this.id = args.id;
        this.profit = args.profit || 0;
        this.debt = args.debt || 0;
    }

    refinance(): void {
        if (this.profit > 0 && this.debt > 0) {
            if (this.profit >= this.debt) {
                this.profit = this.profit - this.debt;
                this.debt = 0;
            } else {
                this.debt = this.debt - this.profit;
                this.profit = 0;
            }
        }
    }
}