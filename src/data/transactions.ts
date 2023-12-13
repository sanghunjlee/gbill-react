import Transaction from "../interfaces/interfaceTransaction";
import { addPersonTransaction, updateTrasnactionPersons } from "./personTransactions";

export function getTransactions(): Transaction[] {
    const storedItem = localStorage.getItem("transactions");
    const transactions: Transaction[] = storedItem ? JSON.parse(storedItem) : [];
    return transactions.sort((a,b) => a.id - b.id);
}

export function getTransaction(id: number): Transaction | null {
    const transactions = getTransactions();
    const transaction = transactions.find(t => t.id === id);
    return transaction ?? null;
}

export function createTransaction({
    payerId, payeeIds, desc, amount
}: Pick<Transaction, "payerId" | "payeeIds" | "desc" | "amount">) {
    let transactions = getTransactions();
    let newId = transactions.length > 0 ? transactions[transactions.length-1].id + 1 : 0;
    if (newId !== transactions.length) {
        for (let i=0; i<transactions.length; i++) {
            if (i > 0 && transactions[i-1].id + 1 !== transactions[i].id){
                newId = transactions[i-1].id + 1;
                break;
            }
        }
    }
    const newTransaction: Transaction = {
        type: "transaction",
        id: newId,
        payerId,
        payeeIds,
        desc,
        amount
    };
    transactions.push(newTransaction);
    set(transactions);

    const personIds = Array.from(new Set([payerId, ...payeeIds]).values());
    personIds.forEach(pid => addPersonTransaction({personId: pid, transactionId: newId}));
}

export function updateTransaction(id: number, update: Partial<Transaction>) {
    const transactions = getTransactions();
    let transaction = transactions.find(t => t.id === id);
    if (!transaction) throw new Error(`No transaction found for: ${id}`);
    Object.assign(transaction, update);
    set(transactions);

    let personIds: number[] = [];
    if (update.payerId) personIds.push(update.payerId);
    if (update.payeeIds) personIds.push(...update.payeeIds);
    if (personIds.length > 0) {
        personIds.forEach(pid => {
            const result = updateTrasnactionPersons(id, pid);
            if (!result) {
                addPersonTransaction({personId: pid, transactionId: id});
            }
        });
    }
}

export function deleteTransaction(id: number): boolean {
    const transactions = getTransactions();
    const index = transactions.findIndex(t => t.id === id);
    if (index > -1) {
        transactions.splice(index, 1);
        set(transactions);
        return true;
    }
    return false;
}

export function deleteAllTransactions() {
    set([]);
}

function set(transactions: Transaction[]) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}