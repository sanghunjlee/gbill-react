import IPerson from "@src/interfaces/interfacePerson";
import ITransaction, { PartialTransaction } from "@src/interfaces/interfaceTransaction";
import { ComponentProps, Context, createContext, useEffect, useState } from "react";

export interface DataContextProps {
    persons: IPerson[]
    transactions: ITransaction[]
    createPerson: ({}: {name: string}) => IPerson
    updatePerson: (id: string, update: Partial<IPerson>) => boolean
    cleanPersons: VoidFunction
    createTransaction: ({}: PartialTransaction) => ITransaction
    updateTransaction: (id: string, update: Partial<ITransaction>) => boolean
    deleteTransaction: (id: string) => boolean
    deleteAllTransactions: VoidFunction
}

export const DataContext: Context<DataContextProps|null> = createContext<DataContextProps|null>(null);

interface DataProviderProps extends Pick<ComponentProps<"div">, "children"> {}


export default function DataProvider({children}: DataProviderProps) {
    const [persons, setPersons] = useState<IPerson[]>(() => {
        const stored = localStorage.getItem("persons");
        const loaded = stored ? JSON.parse(stored) : [];
        return Array.isArray(loaded) ? 
            loaded.map(data => data as IPerson) :
            [];
    });
    const [transactions, setTransactions] = useState<ITransaction[]>(() => {
        const stored = localStorage.getItem("transactions");
        const loaded = stored ? JSON.parse(stored) : [];
        return Array.isArray(loaded) ? 
            loaded.map(data => data as ITransaction) :
            [];
    });

    useEffect(() => {
        localStorage.setItem("persons", JSON.stringify(persons));
    }, [persons]);

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions])

    const createPerson = ({name}: {name: string}) => {
        const newId = crypto.randomUUID();
        const newPerson: IPerson = {
            type: "person",
            id: newId,
            name
        };
        setPersons([...persons, newPerson]);
        return newPerson;
    };
    const updatePerson = (id: string, update: Partial<IPerson>) => {
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
    };

    const cleanPersons = () => {
        // Remove persons not related to any transaction
        const filtered = persons.filter(p => transactions.some(t => t.payeeIds.includes(p.id) || t.payerId === p.id));
        setPersons(filtered);
    }

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
        setTransactions([...transactions, newTransaction]);
        return newTransaction;
    }

    const updateTransaction = (id: string, update: Partial<ITransaction>) => {
        let transaction = transactions.find(t => t.id === id);
        if (transaction) {
            const newTransaction = Object.assign(transaction, update);
            setTransactions([
                ...transactions.filter(t => t.id !== id),
                newTransaction
            ]);
            return true;
        }
        return false;
    }

    const deleteTransaction = (id: string) => {
        const index = transactions.findIndex(t => t.id === id);
        if (index > -1) {
            transactions.splice(index, 1);
            transactions.forEach((t,i) => t.index = i);
            setTransactions(transactions);
            return true;
        }
        return false;
    }

    const deleteAllTransactions = () => {
        setTransactions([]);
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
    return Math.max(...arr.map(t => t.index)) + 1;
}