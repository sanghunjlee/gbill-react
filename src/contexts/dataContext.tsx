import IPerson from "@src/interfaces/interfacePerson";
import ITransaction from "@src/interfaces/interfaceTransaction";
import { getPersons } from "@src/utils/services/persons";
import { getTransactions } from "@src/utils/services/transactions";
import { ComponentProps, Context, createContext, useState } from "react";

export interface DataContextProps {
    persons: IPerson[]
    transactions: ITransaction[]
    reloadPersons: VoidFunction
    reloadTransactions: VoidFunction
}

export const DataContext: Context<DataContextProps|null> = createContext<DataContextProps|null>(null);

interface DataProviderProps extends Pick<ComponentProps<"div">, "children"> {}

export default function DataProvider({children}: DataProviderProps) {
    const [persons, setPersons] = useState<IPerson[]>(getPersons());
    const [transactions, setTransactions] = useState<ITransaction[]>(getTransactions());

    const reloadPersons = () => { setPersons(getPersons()); };
    const reloadTransactions = () => { setTransactions(getTransactions()); };
    
    return (
        <DataContext.Provider value={{ persons, transactions, reloadPersons, reloadTransactions }}>
            {children}
        </DataContext.Provider>
    )
}