import { Form } from "react-router-dom";
import { getPersons } from "../data/persons";
import PersonEntry from "../components/peopleView/personEntry";
import CircleButton from "../components/buttons/circleButton";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import Person from "../interfaces/person";
import Button from "../components/buttons/button";


export default function TransAdd() {
    const [payees, setPayees] = useState<Person[]>([]);

    const handlePayeeClose = (payee: Person) => {
        const newPayees = payees.filter(p => p.id !== payee.id);
        setPayees(newPayees);
    }

    const handlePayeeChange = (payee: Person, newPayeeName: string) => {
        const newPayees = payees.map(p => p.id === payee.id ? Object.assign(p, {name: newPayeeName}) : p);
        setPayees(newPayees);
    }
        
    const handleAddButton = () => {
        let sorted = payees.sort((a,b) => b.id - a.id);
        console.log(sorted);
        let newId = sorted.length > 0 ? sorted[0].id + 1 : 0;
        const newPayee: Person = {
            type: "person",
            id: newId,
            name: ""
        };
        setPayees([...payees, newPayee]);
    }

    return (
        <div className={[
            "w-inherit m-2 p-2 flex flex-col items-center gap-8",
        ].join(" ")}
        >
            <div className="w-full px-2 flex">
                <h1 className="text-xl font-medium dark:text-gray-100">Add a New Transaction</h1>
                <span className="flex-auto"/>
                <div className="flex gap-4">
                    <Button>
                        Submit
                    </Button>
                    <Button>
                        Cancel
                    </Button>
                </div>
            </div>
            <div className="w-full px-2 flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <span className="font-bold">
                        Description
                    </span>
                    <input 
                        name="desc"
                        type="text"
                        className={[
                            "w-full p-2 rounded-lg border-2"
                        ].join(" ")}
                        aria-label="description"
                        placeholder="Add a description"
                    />
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex items-center gap-4">
                        <span className="font-bold">
                            Payer
                        </span>
                        <select 
                            name="payer"
                            className="p-2 rounded-lg border-2"
                            aria-label="payer"
                        >
                            {getPersons().map((person, i) => (
                                <option key={i} value={person.id}>
                                    {person.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-bold">
                            Amount
                        </span>
                        <div className="p-2 rounded-lg border-2">
                            <span>$</span>
                            <input 
                                name="amount"
                                type="number"
                                step="0.01"
                                className="text-right"
                                aria-label="amount"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4 p-2 border-2 rounded-lg">
                    <span className="font-bold">
                        Payee
                    </span>
                    <div className={[
                        "w-full flex justify-center flex-wrap gap-2",
                        "dark:border-gray-500"
                        ].join(" ")}
                    >
                        {payees.map((p) => (
                            <PersonEntry 
                                key={p.id}
                                person={p}
                                onClose={handlePayeeClose}
                                onChange={handlePayeeChange}
                            />
                        ))}
                        <CircleButton
                            id="add-person-button"
                            className="w-[40px] h-[40px] p-2 flex justify-center items-center"
                            onClick={handleAddButton}
                        >
                            <FaPlus />
                        </CircleButton>
                    </div>
                </div>
            </div>
        </div>
    )
}