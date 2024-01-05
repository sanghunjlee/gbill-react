
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Transaction from "../../interfaces/interfaceTransaction";
import { deleteAllTransactions, getTransactions } from "../../data/transactions";
import { getPerson, getPersons } from "../../data/persons";
import Button from "../../components/buttons/button";
import TransItem from "../../components/transItem";
import ErrorMessage from "../../components/errorMessage";

export default function Trans() {
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState<Transaction[]>(getTransactions());
    const [errorText, setErrorText] = useState("");
    const [showError, setShowError] = useState(false);

    const raiseError = (msg: string) => {
        setErrorText(msg);
        setShowError(true);
    }

    const handleAddButton = () => {
        const persons = getPersons();
        if (persons.length > 1) {
            navigate(`/gbill-react/trans/add`);
        } else {
            raiseError("You need more than 2 people to make a transaction!");
        }
    }

    const handleClearButton = () => {
        const persons = getPersons();
        if (persons.length === 0) {
            raiseError("There is nothing to clear!")
        } else {
            deleteAllTransactions();
            setTransaction(getTransactions());
        }
    }

    return (
        <div className={[
                "w-inherit m-2 p-2 flex flex-col items-center gap-2",
            ].join(" ")}
        >
            <div className="w-full px-2">
                <div className="w-fit transition hover:scale-110">
                    <Link to={`/gbill-react/trans`}>
                        <h1 className="text-xl font-medium dark:text-gray-100">Transactions</h1>
                    </Link>
                </div>
            </div>
            <div className="w-full flex">
                <div className="flex-1">
                    <Button
                        className="px-4 py-2 text-sm font-bold"
                        onClick={handleAddButton}
                    >
                        Add
                    </Button>
                </div>
                <div className="flex-auto flex justify-center items-center">
                    <ErrorMessage 
                        text={errorText}
                        visible={showError}
                        setVisible={setShowError}
                    />
                </div>
                <div className="flex-1">
                    <Button
                        className="float-right px-4 py-2 text-sm font-bold"
                        onClick={handleClearButton}
                    >
                        Clear
                    </Button>
                </div>
            </div>
            <div className="w-full">  
                <TransItem 
                    index={"#"}
                    desc={"Description"}
                    payerName={"Payer"}
                    amount={"Amount"}
                    isHeader
                />
                {transaction.map((t, i) => (
                    <TransItem 
                        key={i} 
                        id={t.id}
                        index={i.toString()}
                        desc={t.desc}
                        payerName={getPerson(t.payerId)?.name || ""}
                        amount={"$" + t.amount.toFixed(2)}
                    />
                ))}
                <div className={[
                    "w-full flex gap-2 px-4 py-2 font-bold",
                    "dark:text-gray-100",
                    transaction.length > 0 ? "" : "hidden",
                ].join(" ")}
                >
                    <span className="flex-auto"/>
                    <div>
                        <span>Total Amount:</span>
                    </div>
                    <div className="text-right mr-[80px] ">
                        <span>${transaction.map(t => t.amount).reduce((p,c) => p+c, 0).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}