import { Form, redirect, useNavigate } from "react-router-dom";
import { getPerson, getPersons } from "../data/persons";
import PersonEntry from "../components/peopleView/personEntry";
import CircleButton from "../components/buttons/circleButton";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import Person from "../interfaces/interfacePerson";
import Button from "../components/buttons/button";
import PayeeSelect from "../components/payeeSelect";
import { createTransaction } from "../data/transactions";
import Select from "../components/select";


export default function TransAdd() {
    const navigate = useNavigate();

    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState<number>();
    const [payer, setPayer] = useState<Person>(getPersons()[0]);
    const [payees, setPayees] = useState<Person[]>([]);
    
    const handleSubmitButton = () => {
        console.log({
            payer,
            payee: payees,
            desc,
            amount,
        });
        if (payer !== undefined && amount !== undefined) {
            createTransaction({
                payerId: payer.id,
                payeeIds: payees.map(p => p.id),
                desc,
                amount,
            });
            navigate(-1);
        }
    };

    const handleCancelButton = () => {
        navigate(-1);
    }

    const handlePayeeClose = (index: number) => {
        const newPayees = payees.filter((_, i) => i !== index);
        setPayees(newPayees);
    }

    const handlePayeeChange = (index: number, newPayee: Person) => {
        const newPayees = payees.map(p => p.id === index ? newPayee : p);
        setPayees(newPayees);
    }
        
    const handleAddButton = () => {
        const newPayee = getPersons()[0];
        if (newPayee) setPayees([...payees, newPayee]);
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
                    <Button
                        onClick={handleSubmitButton}
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={handleCancelButton}
                    >
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
                        value={desc}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDesc(event.target?.value)
                        }}
                    />
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex items-center gap-4">
                        <span className="font-bold">
                            Payer
                        </span>
                        <Select 
                            className="p-2 rounded-lg border-2"
                            options={getPersons().map(p => p.name)}
                            aria-label="payer"
                            onChange={(index) => setPayer(getPersons()[index])}
                        />
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
                                value={amount}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setAmount(parseFloat(event.target?.value));
                                }}
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
                        {payees.map((p, i) => (
                            <PayeeSelect 
                                key={i}
                                value={p}
                                onClose={() => handlePayeeClose(i)}
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