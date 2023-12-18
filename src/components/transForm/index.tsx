import { useState } from "react";
import Transaction, { PartialTransaction } from "../../interfaces/interfaceTransaction";
import Button from "../buttons/button";
import CircleButton from "../buttons/circleButton";
import PayeeSelect from "../payeeSelect";
import { getPerson, getPersons } from "../../data/persons";
import Select from "../select";
import { FaPlus } from "react-icons/fa";
import Person from "../../interfaces/interfacePerson";

interface TransFormProps {
    initialValue?: Transaction,
    readonly?: boolean,
    onSubmit?: (trans: PartialTransaction) => void,
    onCancel?: () => void,
}

export default function TransForm({
    initialValue, readonly, onSubmit, onCancel
}: TransFormProps) {
    const [amount, setAmount] = useState(initialValue ? initialValue.amount : undefined);
    const [desc, setDesc] = useState(initialValue ? initialValue.desc : '');
    const [payeeIds, setPayeeIds] = useState(initialValue ? initialValue.payeeIds : [getPersons()[0].id]);
    const [payerId, setPayerId] = useState(initialValue ? initialValue.payerId : getPersons()[0].id);

    const handleSubmitButton = () => {
        const newTrans: PartialTransaction = {
            amount: amount ?? 0,
            desc: desc !== '' ? desc : 'Untitled',
            payeeIds,
            payerId,
        };

        if (onSubmit) onSubmit(newTrans);
    }
    const handleCancelButton = () => {
        if (onCancel) onCancel();
    }

    const handlePayeeClose = (index: number) => {
        const newPayeeIds = payeeIds.filter((_, i) => i !== index);
        setPayeeIds(newPayeeIds);
    }

    const handlePayeeChange = (index: number, newPayee: Person) => {
        const newPayeeIds = payeeIds.map((p, i) => i === index ? newPayee.id : p);
        console.log('payee changed:', newPayeeIds);
        setPayeeIds(newPayeeIds);
    }

    const handleAddPayeeButton = () => {
        const newPayeeId = getPersons()[0]?.id;
        console.log(newPayeeId);
        if (newPayeeId !== undefined) setPayeeIds([...payeeIds, newPayeeId]);
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
                            selectedIndex={getPersons().findIndex(p => p.id == payerId)}
                            options={getPersons().map(p => p.name)}
                            aria-label="payer"
                            onChange={(index: number) => setPayerId(getPersons()[index].id)}
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
                                className={[
                                    "text-right",
                                ].join(" ")}
                                aria-label="amount"
                                value={amount}
                                placeholder="0.00"
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
                        {payeeIds.map((pid, i) => (
                            <PayeeSelect 
                                key={i}
                                index={i}
                                value={getPerson(pid)}
                                onClose={() => handlePayeeClose(i)}
                                onChange={handlePayeeChange}
                            />
                        ))}
                        <CircleButton
                            id="add-person-button"
                            className="w-[40px] h-[40px] p-2 flex justify-center items-center"
                            onClick={handleAddPayeeButton}
                        >
                            <FaPlus />
                        </CircleButton>
                    </div>
                </div>
            </div>
        </div>
    )
}