import React from "react";
import { getTransactions } from "../data/transactions";
import Transaction from "../interfaces/interfaceTransaction";
import PeopleView from "../components/peopleView";
import TransView from "../components/transView";
import { useLoaderData } from "react-router-dom";
import Person from "../interfaces/interfacePerson";

interface LoaderDataType {
    persons: Person[],
    transactions: Transaction[]
}

export async function loader(): Promise<LoaderDataType> {
    const persons: Person[] = [];
    const transactions = getTransactions();
    return { persons, transactions };
}

export default function Home() {
    const { persons, transactions} = useLoaderData() as LoaderDataType;
    return (
        <div
            className="flex flex-col"
        >
            <PeopleView />
            <TransView transactions={transactions}/>
        </div>
    )
}
