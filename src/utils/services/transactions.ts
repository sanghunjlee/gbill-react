import Transaction, { PartialTransaction } from "../../interfaces/interfaceTransaction";
import { addPersonTransaction, deleteAllPersonTransactions, deletePersonTransaction, updateTrasnactionPersons } from "./personTransactions";

export function getTransactions(): Transaction[] {
    const storedItem = localStorage.getItem("transactions");
    const transactions: Transaction[] = storedItem ? JSON.parse(storedItem) : [];
    return transactions.sort((a,b) => a.index - b.index);
}

export function getTransaction(id: string): Transaction | undefined {
    const transactions = getTransactions();
    const transaction = transactions.find(t => t.id === id);
    return transaction;
}

export function createTransaction({
    payerId, payeeIds, desc, amount
}: PartialTransaction) {
    let transactions = getTransactions();
    let newId = crypto.randomUUID()
    let newIndex = generateNewTransIndex();
    const newTransaction: Transaction = {
        type: "transaction",
        id: newId,
        index: newIndex,
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

export function updateTransaction(id: string, update: Partial<Transaction>) {
    const transactions = getTransactions();
    let transaction = transactions.find(t => t.id === id);
    if (!transaction) throw new Error(`No transaction found for: ${id}`);
    Object.assign(transaction, update);
    set(transactions);

    let personIds: string[] = [];
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

export function deleteTransaction(id: string): boolean {
    const transactions = getTransactions();
    const tndex = transactions.findIndex(t => t.id === id);
    if (tndex > -1) {
        transactions.splice(tndex, 1);
        // Update transactions indices 
        transactions
            .sort((a,b) => a.index - b.index)
            .forEach((t, i) => t.index = i)
        set(transactions);

        deletePersonTransaction({transactionId: id});
        return true;

    }
    return false;
}

export function deleteAllTransactions() {
    set([]);
    deleteAllPersonTransactions();
}

export function generateNewTransIndex(): number {
    const transactions = getTransactions();
    return Math.max(...transactions.map(t => t.index)) + 1;
}

function set(transactions: Transaction[]) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}