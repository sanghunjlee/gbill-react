import { useLoaderData } from "react-router-dom";
import TransView from "../components/transView";
import { getTransactions } from "../data/transactions";
import Transaction from "../interfaces/interfaceTransaction";

export async function loader(): Promise<Transaction[]> {
    const transactions = getTransactions();
    return transactions;
}

export default function Trans() {
    const transactions = useLoaderData() as Transaction[];
    return (
        <>
            <TransView transactions={transactions}/>
        </>
    )
}