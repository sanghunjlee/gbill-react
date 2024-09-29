import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Bill, BillItem } from "@src/features/bill/interface";

export interface BillState {
    status: 'idle' | 'loading' | 'failed';
    bills: Bill[];
}

const initialState: BillState = {
    status: 'idle',
    bills: [],
};

export const billSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {
        createBill: (state, action: PayloadAction<Bill>) => {
            if (state.bills.length === 0 || state.bills.find(b => b.id === action.payload.id) !== undefined) {
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
        addBillItem: (state, action: PayloadAction<{billId: string, item: BillItem}>) => {
            const bill = state.bills.find(b => b.id === action.payload.billId)
            if (bill !== undefined) {
                state.bills = [
                    ...state.bills.filter(b => b.id !== bill.id),
                    Object.assign(
                        bill,
                        {
                            items: [
                                ...bill.items,
                                action.payload.item
                            ]
                        }
                    ) as Bill
                ];
            }
        },
        editBillItem: (state, action: PayloadAction<{billId: string, item: Partial<BillItem>}>) => {
            const bill = state.bills.find(b => b.id === action.payload.billId);
            if (bill !== undefined && action.payload.item.id !== undefined) {
                const bitem = bill.items.find(it => it.id === action.payload.item.id);
                if (bitem !== undefined) {
                    bill.items = [
                        ...bill.items.filter(it => it.id !== bitem.id),
                        Object.assign(bitem, action.payload.item)
                    ];
                    
                    state.bills = [
                        ...state.bills.filter(b => b.id !== bill.id),
                        bill
                    ];
                }
            }
        },
        removeBillItem: (state, action: PayloadAction<{billId: string, itemId: string}>) => {
            const bill = state.bills.find(b => b.id === action.payload.billId);
            if (bill !== undefined) {
                bill.items = bill.items.filter(it => it.id !== action.payload.itemId);
                state.bills = [
                    ...state.bills.filter(b => b.id !== bill.id),
                    bill
                ]
            }
        },
        clearBillItems: (state, action: PayloadAction<string>) => {
            const bill = state.bills.find(b => b.id === action.payload);
            if (bill !== undefined) {
                bill.items = [];
                state.bills = [
                    ...state.bills.filter(b => b.id !== bill.id),
                    bill
                ];
            }
        }
    }
});

export const { 
    createBill, editBill, removeBill, clearBills,
    addBillItem, editBillItem, removeBillItem, clearBillItems
} = billSlice.actions;
export default billSlice.reducer;