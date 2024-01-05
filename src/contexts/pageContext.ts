import { createContext } from "react";
import Person from "../interfaces/interfacePerson";
import Transaction from "../interfaces/interfaceTransaction";

interface DataContextProps {
    persons: Person[],
    transactions: Transaction[],
    updatePersons: Function,
    updateTransactions: Function
    
}

export const DataContext = createContext<DataContextProps>({
    persons: [],
    transactions: [],
    updatePersons: () => {},
    updateTransactions: () => {}
});