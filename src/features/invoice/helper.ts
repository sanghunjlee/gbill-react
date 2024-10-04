import { useAppSelector } from "@src/common/hooks";
import type { Bill } from "@src/features/bill/interface";
import { selectBillItems } from "@src/features/bill/slice";
import type { Invoice } from "@src/features/invoice/interface";
import type { Person } from "@src/features/person/interface";
import { selectPersons } from "@src/features/person/slice";


export function getInvoices(bills: Bill[]): Invoice[] {
    const invoices: Invoice[] = []

    
    bills.forEach((bill) => {
        const group = bill.items.map(bi => bi.ordererIds).reduce((p, c) => {
            const arr = [
                ...p,
                ...c.filter(cpid => !p.includes(cpid))
            ];
            return arr;
        }, []);

        if (!group.includes(bill.payerId)) group.push(bill.payerId);

        bill.items.forEach((item) => {
            item.ordererIds.forEach((oid) => {
                if (bill.payerId === oid) {
                    return;
                }

                const iid = crypto.randomUUID();

                const invoice = {
                    id: iid,
                    toId: bill.payerId,
                    fromId: oid,
                    amount: ((item.amount * (1 + (bill.tax || 0))) / item.ordererIds.length) + (group.length > 0 ? ((bill.tip || 0) / group.length) : 0),
                } as Invoice;

                invoices.push(invoice);
            });
        });
    });

    return invoices;
}

export function optimizeInvoices(invoices: Invoice[]): Invoice[] {
    const usedIndices: number[] = [];
    const optimized: Invoice[] = [];

    let i = 0;
    while(i < invoices.length) {
        if (usedIndices.includes(i)) {
            i += 1;
            continue;
        }

        const inv = invoices[i];
        usedIndices.push(i);

        const opposed = invoices.filter((jnv) => jnv.toId === inv.fromId);
        opposed.map((jnv) => (
            invoices.findIndex(knv => knv.id === jnv.id)
        )).forEach((jndex) => {
            if (jndex !== -1 && !usedIndices.includes(jndex)) {
                usedIndices.push(jndex);
            }
        });
        
        const newAmount = inv.amount - (opposed.map(jnv => jnv.amount).reduce((p,c) => p+c, 0));
        
        const newInv = {
            id: inv.id,
            toId: newAmount < 0 ? inv.fromId : inv.toId,
            fromId: newAmount < 0 ? inv.toId : inv.fromId,
            amount: Math.abs(newAmount),
        } as Invoice;
        
        optimized.push(newInv);

        i += 1;
    }
    
    return optimized;
}

export function getRadarInvoices(bills: Bill[]): Invoice[] {
    // Generate invoices using Radar Optimization
    // Radar Optmization is a bucket-fill method
    // Per person, calculate the amount to collect & amount to pay
    // From the person with the biggest amount to pay, 
    //     start filling the biggest bucket (person with the most amount to collect)

    console.log("Radar Optmizing bills");

    const invoices: Invoice[] = [];

    const persons = useAppSelector(selectPersons);

    type weeb = {
        id: string,
        profit: number,
        debt: number
    }
    const weebs: weeb[] = persons.map(p => ({
        id: p.id,
        profit: bills.filter(b => b.payerId === p.id).map(b => b.amount + (b.tip || 0)).reduce((p,c) => p+c, 0), 
        debt: 0,
    }));

    // Parse debts from bills
    bills.forEach(bill => {
        const group = bill.items.map(bi => bi.ordererIds).reduce((p, c) => {
            const arr = [
                ...p,
                ...c.filter(cpid => !p.includes(cpid))
            ];
            return arr;
        });
        if (!group.includes(bill.payerId)) group.push(bill.payerId);

        bill.items.forEach(item => {
            const sharedCost = ((item.amount * (1 + (bill.tax || 0)))/ item.ordererIds.length)
                + (group.length > 0 ? ((bill.tip || 0) / group.length) : 0);
            
            item.ordererIds.forEach(oid => {
                const w = weebs.find(w => w.id === oid);
                if (w) w.debt += sharedCost;
            });
        });
    });

    for (let w of weebs) {
        console.log(w);
    }
    
    weebs.sort((a,b) => b.profit - a.profit);

    for (let bucket of weebs) {
        weebs.sort((a,b) => b.debt - a.debt);
        for (let water of weebs) {
            if (water.id === bucket.id) continue;
            if (water.debt <= 0) continue;

            const payment = water.debt;

            const inv = {
                id: crypto.randomUUID(),
                toId: bucket.id,
                fromId: water.id,
                amount: payment <= bucket.profit ? payment : bucket.profit
            };
            invoices.push(inv);
            console.log("Invoice Created: ", inv);

            if (payment <= bucket.profit) {
                water.debt -= payment;
                bucket.profit -= payment;
            } else {
                water.debt -= bucket.profit;
                bucket.profit = 0;
                break;
            }
        }

        weebs.sort((a,b) => b.profit - a.profit);
    }
    
    console.log("Invoices: ", invoices);
    return invoices
}