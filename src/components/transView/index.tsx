import React from "react";
import { Link } from "react-router-dom";

import Transaction from "../../interfaces/transaction";
import { deleteAllTransactions } from "../../data/transactions";
import Button from "../buttons/button";
import TransItem from "./transItem";


export default function TransView({ transactions }: { transactions: Transaction[] }) {

    const handleClearButton = () => {
        deleteAllTransactions();
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
                    payer={"Payer"}
                    amount={"Amount"}
                    isHeader
                />
                {transactions.map((t, i) => (
                    <TransItem 
                        key={i} 
                        index={i.toString()}
                        desc={t.desc}
                        payer={t.payer}
                        amount={"$" + t.amount.toFixed(2)}
                    />
                ))}
            </div>
        </div>
    )
}