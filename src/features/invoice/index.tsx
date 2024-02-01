import { useContext, useEffect, useState } from "react";
import { getPersons } from "../../utils/services/persons";
import { getTransactions } from "../../utils/services/transactions";
import Transaction from "../../interfaces/interfaceTransaction";
import Person from "../../interfaces/interfacePerson";
import { DataContext, DataContextProps } from "@src/contexts/dataContext";

interface Payment {
    receiverId: string,
    senderId: string,
    amount: number
}

export default function Invoice() {
    const {persons, transactions} = useContext(DataContext) as DataContextProps;

    const getBalance = (person: Person) => {
        // Positive balance := this person is owed money from others
        // Negative balance := this person owes money to others
        let balance: number = 0;
        balance += transactions.filter((trans) => trans.payerId === person.id).map(t => t.amount).reduce((p,c) => p+c, 0);
        balance -= transactions.filter((trans) => trans.payeeIds.includes(person.id)).map(t => t.amount / t.payeeIds.length).reduce((p,c) => p+c, 0);
        return Number(balance.toFixed(6));
    }

    let cashflow: { [id: string] : number; } = {};
    persons.forEach((person) => cashflow[person.id] = getBalance(person));
    const cashflowDiv = Object.keys(cashflow).map((k, i) => 
        <div key={i}>
            <span>{persons.find(p => p.id === k)?.name}</span>
            <span>: </span>
            <span>{cashflow[k]}</span>
        </div>
    );

    const payments: Payment[] = [];
    let sortedPersons: Person[] = persons.slice().sort((a,b) => cashflow[b.id] - cashflow[a.id]);
    sortedPersons.forEach((receiver) => {
        while (cashflow[receiver.id] > 0) {
            const sender: Person | undefined = sortedPersons.find((person) => cashflow[person.id] < 0);
            if (sender) {
                const payment = Math.min(Math.abs(cashflow[receiver.id]), Math.abs(cashflow[sender.id]));
                cashflow[receiver.id] = Number((cashflow[receiver.id] - payment).toFixed(6));
                cashflow[sender.id] = Number((cashflow[sender.id] + payment).toFixed(6));
                payments.push({
                    receiverId: receiver.id,
                    senderId: sender.id,
                    amount: payment
                });
            } else {
                break;
            }
        }
    });

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
            <div className="flex gap-2 font-medium">
                <span>Total # of People:</span>
                <span>{persons?.length}</span>
            </div>
            <div className="flex gap-2 font-medium">
                <span>Total # of Transactions:</span>
                <span>{transactions?.length}</span>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-medium">Payments</h3>
                {
                    payments.map((p, i) => 
                        <div 
                            key={i}
                            className={[
                                "w-full flex items-center border-2 rounded-lg p-2 gap-2"
                            ].join(" ")}
                        >
                            <div className="flex-1 flex justify-center">
                                <div className="border-2 rounded-lg p-2">
                                    <span>
                                        {persons.find(_p => _p.id === p.senderId)?.name} 
                                    </span>
                                </div>
                            </div>
                            <div className="relative flex-[2_1_0%]">
                                <div className="absolute left-0 right-0 h-1 z-10 rounded-lg bg-gray-300" />
                                <div className="absolute h-1 w-4 right-0 rounded-lg bg-gray-300 origin-right rotate-[30deg] translate-y-[1px]" />
                                <div className="absolute h-1 w-4 right-0 rounded-lg bg-gray-300 origin-right -rotate-[30deg] translate-y-[-1px]" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="border-2 rounded-lg p-2">
                                    <span>
                                        {persons.find(_p => _p.id === p.receiverId)?.name}
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <span>
                                    ${p.amount.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
    );
}