import { createContext } from "react";
import Person from "../interfaces/interfacePerson";
import Transaction from "../interfaces/interfaceTransaction";

interface DataContextProps {
    persons?: Person[],
    transactions?: Transaction[],
    setPersons?: Function,
    setTransactions?: Function
    
}

export const DataContext = createContext<DataContextProps>({});