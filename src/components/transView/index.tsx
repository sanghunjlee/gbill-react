import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../buttons/button";
import Transaction from "../../interfaces/transaction";
import TransItem from "./transItem";

export default function TransView() {
    const [trans, setTrans] = useState<Transaction[]>([{
        id: 0,
        payee: "PersonA",
        payer: ["PersonA"],
        desc: "Transaction 1",
        amount: 30,
    }])

    const transItems = trans.map((t, i) => (
        <TransItem 
            key={i} 
            index={i.toString()} 
            desc={t.desc}
            payee={t.payee}
            amount={"$" + t.amount.toFixed(2)}
        />
    ))

    return (
        <div className={[
                "w-inherit m-2 p-2 flex flex-col items-center gap-2",
            ].join(" ")}
        >
            <div className="w-full px-2">
                <Link to={`/trans`}>
                    <h1 className="text-xl font-medium dark:text-gray-100">Transactions</h1>
                </Link>
            </div>
            <div className="w-full flex">
                <Link to={`/trans/add`}>
                    <Button
                        className="px-4 py-2 text-sm font-bold"
                    >
                        Add
                    </Button>
                </Link>
                <span className="flex-auto"/>
                    <Button
                        className="px-4 py-2 text-sm font-bold"
                    >
                        Clear
                    </Button>
            </div>
            <div className="w-full">  
                <TransItem 
                    index={"#"} 
                    desc={"Description"}
                    payee={"Payee"}
                    amount={"Amount"}
                    isHeader
                />
                {transItems}
            </div>
        </div>
    )
}