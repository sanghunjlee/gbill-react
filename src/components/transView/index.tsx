import React, { useState } from "react";

import Button from "../buttons/button";
import Transaction from "../../interfaces/transaction";
import TransItem from "../transItem";

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
                <h1 className="text-xl font-medium dark:text-gray-100">Transactions</h1>
            </div>
            <div>
                <Button>
                    Add
                </Button>
                <Button>
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