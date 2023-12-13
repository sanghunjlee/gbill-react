import React, { useState } from "react";
import { Link } from "react-router-dom";

import Transaction from "../../interfaces/interfaceTransaction";
import { deleteAllTransactions, getTransactions } from "../../data/transactions";
import Button from "../buttons/button";
import TransItem from "./transItem";
import { getPerson } from "../../data/persons";


export default function TransView({ transactions }: { transactions: Transaction[] }) {
    const [_transaction, setTransaction] = useState<Transaction[]>(transactions)

    const handleClearButton = () => {
        deleteAllTransactions();
        setTransaction(getTransactions());
    }

    return (
        <div className={[
                "w-inherit m-2 p-2 flex flex-col items-center gap-2",
            ].join(" ")}
        >
            <div className="w-full px-2">
                <Link to={`/gbill-react/trans`}>
                    <h1 className="text-xl font-medium dark:text-gray-100">Transactions</h1>
                </Link>
            </div>
            <div className="w-full flex">
                <Link to={`/gbill-react/trans/add`}>
                    <Button
                        className="px-4 py-2 text-sm font-bold"
                    >
                        Add
                    </Button>
                </Link>
                <span className="flex-auto"/>
                    <Button
                        className="px-4 py-2 text-sm font-bold"
                        onClick={handleClearButton}
                    >
                        Clear
                    </Button>
            </div>
            <div className="w-full">  
                <TransItem 
                    index={"#"}
                    desc={"Description"}
                    payerName={"Payer"}
                    amount={"Amount"}
                    isHeader
                />
                {_transaction.map((t, i) => (
                    <TransItem 
                        key={i} 
                        index={i.toString()}
                        desc={t.desc}
                        payerName={getPerson(t.payerId)?.name || ""}
                        amount={"$" + t.amount.toFixed(2)}
                    />
                ))}
            </div>
        </div>
    )
}