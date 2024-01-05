import PeopleView from "../../components/peopleView";
import Trans from "../trans";
import Invoice from "../../components/invoice";
import { useState } from "react";
import Person from "../../interfaces/interfacePerson";
import { getPersons } from "../../data/persons";
import Transaction from "../../interfaces/interfaceTransaction";
import { getTransactions } from "../../data/transactions";


export default function Home() {
    return (
        <>
            <div
                className="flex flex-col"
            >
                <PeopleView />
                <Trans />
                <Invoice />
            </div>
        </>
    )
}
