import IPerson from "@common/interfaces/interfacePerson";
import ITransaction, { PartialTransaction } from "@common/interfaces/interfaceTransaction";
import { ComponentProps, Context, createContext, useCallback, useEffect, useReducer, useState } from "react";

export interface DataContextProps {
    persons: IPerson[]
    transactions: ITransaction[]
    createPerson: ({}: {name: string}) => IPerson
    updatePerson: (id: string, update: Partial<IPerson>) => boolean
    cleanPersons: VoidFunction
    createTransaction: ({}: PartialTransaction) => ITransaction
    updateTransaction: (id: string, update: Partial<ITransaction>) => void
    deleteTransaction: (id: string) => void
    deleteAllTransactions: VoidFunction
}

export const DataContext: Context<DataContextProps|null> = createContext<DataContextProps|null>(null);

type ReducerActionType<T> = {
    type: "create"|"update"|"delete"|"clear",
    args?: T|Partial<T>
}

function transactionsReducer(state: ITransaction[], action: ReducerActionType<ITransaction>) {
    switch (action.type) {
        case "create":
            if (action.args) {
                if (action.args.type && action.args.type === 'transaction') {
                    const newTransaction = action.args as ITransaction;
                    const newTransactions = [...state, newTransaction].sort((a,b) => a.index - b.index);
                    localStorage.setItem("transactions", JSON.stringify(newTransactions));
                    return newTransactions;
                }
            }
            throw Error(`No args provided for "create" action.`);
        case "update":
            if (action.args) {
                const { id, ...update } = action.args;
                let transaction = state.find(t => t.id === id);
                if (transaction) {
                    const newTransaction = Object.assign(transaction, update);
                    const newTransactions = [
                        ...state.filter(t => t.id !== id),
                        newTransaction
                    ].sort((a,b) => a.index - b.index);

                    localStorage.setItem("transactions", JSON.stringify(newTransactions));
                    return newTransactions;
                }
                throw Error(`No transaction to update. ${id}`);
            }
            throw Error(`No arges provided for "update" action.`);
        case "delete":
            if (action.args) {
                const { id } = action.args;
                const index = state.findIndex(t => t.id === id);
                if (index > -1) {
                    let newTransactions = state.filter(t => t.id !== id);
                    newTransactions.forEach((t,i) => t.index = i);
                    
                    localStorage.setItem("transactions", JSON.stringify(newTransactions));
                    return newTransactions;
                }
                throw Error(`No transaction to delete. ${id}`);
            }
            throw Error(`No arges provided for "delete" action.`);
        case "clear":
            return [];
    }
    throw Error(`Unknown action: ${action.type}`);
}

function transactionsInit() {
    const stored = localStorage.getItem("transactions");
    const loaded = stored ? JSON.parse(stored) : [];
    return Array.isArray(loaded) ? loaded.map(data => data as ITransaction) : [];
}

interface DataProviderProps extends Pick<ComponentProps<"div">, "children"> {}

export default function DataProvider({children}: DataProviderProps) {
    const [persons, setPersons] = useState<IPerson[]>(() => {
        const stored = localStorage.getItem("persons");
        const loaded = stored ? JSON.parse(stored) : [];
        return Array.isArray(loaded) ? 
            loaded.map(data => data as IPerson) :
            [];
    });
    const [transactions, dispatchTransactions] = useReducer(transactionsReducer, null, transactionsInit); 

    useEffect(() => {
        localStorage.setItem("persons", JSON.stringify(persons));
    }, [persons]);

    const createPerson = useCallback(({name}: {name: string}) => {
        const newId = crypto.randomUUID();
        const newPerson: IPerson = {
            type: "person",
            id: newId,
            name
        };
        setPersons([...persons, newPerson]);
        return newPerson;
    }, [persons]);
    const updatePerson = useCallback((id: string, update: Partial<IPerson>) => {
        let person = persons.find(p => p.id === id);
        if (person) {
            const newPerson = Object.assign(person, update);
            setPersons([
                ...persons.filter(p => p.id !== id),
                newPerson
            ]);
            return true;
        }
        return false;
    }, [persons]);

    const cleanPersons = useCallback(() => {
        // Remove persons not related to any transaction
        const filtered = persons.filter(p => transactions.some(t => t.payeeIds.includes(p.id) || t.payerId === p.id));
        setPersons(filtered);
    }, [persons, transactions]);

    const createTransaction = ({
        payerId, payeeIds, desc, amount
    }:PartialTransaction) => {
        let newId = crypto.randomUUID()
        let newIndex = generateNewIndex(transactions);
        const newTransaction: ITransaction = {
            type: "transaction",
            id: newId,
            index: newIndex,
            payerId,
            payeeIds,
            desc,
            amount
        };
        dispatchTransactions({
            type: "create",
            args: newTransaction
        });
        return newTransaction;
    };

    const updateTransaction = (id: string, update: Partial<ITransaction>) => {
        dispatchTransactions({
            type: "update",
            args: {
                id,
                ...update
            }
        });
    };

    const deleteTransaction = (id: string) => {
        dispatchTransactions({
            type: "delete",
            args: { id }
        })
    };

    const deleteAllTransactions = () => {
        dispatchTransactions({
            type: "clear"
        })
    }

    return (
        <DataContext.Provider 
            value={{ 
                persons, 
                transactions,
                createPerson,
                updatePerson,
                cleanPersons,
                createTransaction,
                updateTransaction,
                deleteTransaction,
                deleteAllTransactions
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

function generateNewIndex(arr: ITransaction[]): number {
    if (!arr || arr.length === 0) return 0;
    return Math.max(...arr.map(t => t.index)) + 1;
}