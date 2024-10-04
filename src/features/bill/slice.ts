import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Bill, BillItem } from "@src/features/bill/interface";
import type { Person } from "@src/features/person/interface";

export interface BillState {
    status: 'idle' | 'loading' | 'failed';
    bills: Bill[];
}

const initialBillState: BillState = {
    status: 'idle',
    bills: [],
};

export const billSlice = createSlice({
    name: 'bill',
    initialState: initialBillState,
    reducers: {
        createBill: (state, action: PayloadAction<Bill>) => {
            if (state.bills.find(b => b.id === action.payload.id) === undefined) {
                state.bills.push(action.payload);
                console.log("CreateBill finsihed successfully!");
            } else {
                console.error(`CreateBill failed: ${action.payload.id} (${action.payload.description}) already exists?`)
            }
        },
        editBill: (state, action: PayloadAction<Partial<Bill>>) => {
            if (action.payload.id === undefined) return;
            const bill = state.bills.find(b => b.id === action.payload.id);
            if (bill !== undefined) {
                state.bills = [
                    ...state.bills.filter(b => b.id !== bill.id),
                    Object.assign(bill, action.payload) as Bill
                ];
            }
        },
        removeBill: (state, action: PayloadAction<string>) => {
            const bill = state.bills.find(b => b.id === action.payload);
            if (bill !== undefined) {
                state.bills = state.bills.filter(b => b.id !== bill.id);
            }
        },
        clearBills: (state) => {
            state.bills = [];
        },
    },
    selectors: {
        selectBills: (state): Bill[] => state.bills,
        selectBillsCount: (state): number => state.bills.length,
        selectBillsAmount: (state): number => state.bills.length === 0 ? 0 : state.bills.reduce((p,c) => p + c.amount, 0),
        selectBillsByPayer: (state, payer: Person): Bill[] => state.bills.filter(b => b.payerId === payer.id),
        selectBillItems: (state): BillItem[] => state.bills.map(b => b.items).reduce((p,c) => p.concat(c), []),
    }
});

export const { 
    createBill, editBill, removeBill, clearBills,
} = billSlice.actions;

export const {
    selectBills, selectBillsCount, selectBillsAmount, selectBillsByPayer,
    selectBillItems,
} = billSlice.selectors;

export default billSlice.reducer;