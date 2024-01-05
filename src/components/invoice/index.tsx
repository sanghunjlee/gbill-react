import { useContext, useEffect, useState } from "react";
import { getPersons } from "../../data/persons";
import { getTransactions } from "../../data/transactions";
import Transaction from "../../interfaces/interfaceTransaction";
import Person from "../../interfaces/interfacePerson";
import { DataContext } from "../../contexts/pageContext";

export default function Invoice() {
    const {persons, transactions} = useContext(DataContext);

    return (
        <div className={[
            "w-inherit m-2 p-2 flex flex-col items-center gap-2",
        ].join(" ")}
    >
        <div className="w-full px-2">
            <h1 className="text-xl font-medium dark:text-gray-100">Invoice</h1>
        </div>
        <div className={[
            "w-full flex-[44px] flex flex-col justify-center flex-wrap gap-2 p-2 border-2 rounded-lg",
            "dark:border-gray-500"
            ].join(" ")}
        >
            <div className="flex gap-2">
                <span>Total # of People:</span>
                <span>{persons?.length}</span>
            </div>
            <div className="flex gap-2">
                <span>Total # of Transactions:</span>
                <span>{transactions?.length}</span>
            </div>

        </div>
    </div>
    );
}