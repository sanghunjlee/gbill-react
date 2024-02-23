import { ChangeEvent, useContext, useState } from "react";
import Transaction, { PartialTransaction } from "../../../interfaces/interfaceTransaction";
import PersonSelect from "./personSelect";
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton, Switch } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DataContext, DataContextProps } from "@src/contexts/dataContext";
import NumberField from "@src/components/numberField";
import IPerson from "../../../interfaces/interfacePerson";



interface TransFormProps {
    title?: string,
    initialValue?: Transaction,
    readonly?: boolean,
    onSubmit?: (trans: PartialTransaction) => void,
    onCancel?: () => void,
}

export default function TransForm({
    title, initialValue, readonly:_readonly, onSubmit, onCancel
}: TransFormProps) {
    const {persons, createPerson} = useContext(DataContext) as DataContextProps;
    const [amount, setAmount] = useState(initialValue ? initialValue.amount : undefined);
    const [desc, setDesc] = useState(initialValue ? initialValue.desc : '');
    const [payeeIds, setPayeeIds] = useState<string[]>(initialValue ? initialValue.payeeIds : []);
    const [payerId, setPayerId] = useState(initialValue ? initialValue.payerId : null);
    const [readonly, setReadonly] = useState(_readonly || false);

    const handleSubmitButton = () => {
        if (payerId && payeeIds.length > 0) {
            const newTrans: PartialTransaction = {
                amount: amount ?? 0,
                desc: desc !== '' ? desc : 'Untitled',
                payeeIds,
                payerId,
            };
    
            if (onSubmit) onSubmit(newTrans);
        }
    }
    const handleCancelButton = () => {
        if (onCancel) onCancel();
    }

    const handleDescChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target?.value);
    }
    
    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(event.target?.value));
    }

    const handlePayerChange = (newPayer: IPerson) => {
        if (newPayer.id === "") {
            // New person
            const newPerson = createPerson({name: newPayer.name});
            setPayerId(newPerson.id);
        } else {
            setPayerId(newPayer.id);
        }
    }

    const handlePayeeClose = (index: number) => {
        const newPayeeIds = payeeIds.filter((_, i) => i !== index);
        setPayeeIds(newPayeeIds);
    }

    const handlePayeeChange = (index:number, newPayee: IPerson) => {
        let newPayeeIds = payeeIds;
        if (newPayee.id === "") {
            // New person
            const newPerson = createPerson({name: newPayee.name});
            newPayeeIds[index] = newPerson.id;
        } else {
            newPayeeIds[index] = newPayee.id;
        }
        console.log('payee changed:', newPayeeIds);
        setPayeeIds(newPayeeIds);
    }

    const handleAddPerson = () => {
        setPayeeIds([...payeeIds, ""]);
    }

    return (
        <div className={[
            "w-inherit m-2 p-2 flex flex-col items-center gap-8",
            "dark:text-gray-100"
        ].join(" ")}
        >
            <div className="w-full px-2 flex gap-2">
                <h1 className="text-xl font-medium dark:text-gray-100">{title}</h1>
                {
                    import.meta.env.DEV ? (
                        <div className="relative w-[120px] rounded border-2">
                            <div className="absolute left-0 right-0 top-[-1rem] text-center">
                                <span className="px-2 bg-white text-xs">DEV ONLY</span>
                            </div>
                            <Switch
                                value={readonly}
                                onChange={() => setReadonly(!readonly)}
                            />
                        </div>
                    ) : null
                }
                <span className="flex-auto"/>
                <div className="flex gap-4">
                    {
                        readonly ? <></> :
                        <Button
                            onClick={handleSubmitButton}
                        >
                            <span>
                                Submit
                            </span>
                        </Button>

                    }
                    <Button
                        onClick={handleCancelButton}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
            <div className="w-full px-2 flex flex-col gap-8">
                <div className="flex items-center gap-4">
                    <TextField
                        fullWidth
                        value={desc}
                        onChange={handleDescChange}
                        label="Description"
                        disabled={readonly}
                        InputLabelProps={{
                            shrink: readonly ? true : undefined
                        }}
                        InputProps={{
                            readOnly: readonly,
                            disabled: false
                        }}
                    />
                </div>
                <div className="w-full flex justify-between">
                    <div className="flex items-center gap-4">
                        <PersonSelect 
                            label="Payer"
                            readonly={readonly}
                            value={persons.find(p => p.id === payerId)}
                            onChange={(newValue: IPerson|null) => {
                                if (newValue) {
                                    handlePayerChange(newValue);
                                }
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <NumberField 
                            value={amount}
                            onChange={handleAmountChange}
                            disabled={readonly}
                            InputLabelProps={{
                                shrink: readonly ? true : undefined
                            }}
                            InputProps={{
                                readOnly: readonly,
                                disabled: false
                            }}
                        />
                        
                        {/* <span className="font-bold">
                            Amount
                        </span>
                        <div className="p-2 rounded-lg border-2">
                            <span>$</span>
                            {
                                readonly ? 
                                <span
                                    className={[
                                        "bg-[white] text-right",
                                        "dark:bg-gray-800"
                                    ].join(" ")}>
                                    {amount?.toFixed(2)}
                                </span> :
                                <input 
                                    name="amount"
                                    type="number"
                                    step="0.01"
                                    className={[
                                        "bg-[white] text-right",
                                        "dark:bg-gray-800"
                                    ].join(" ")}
                                    aria-label="amount"
                                    value={amount}
                                    placeholder="0.00"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setAmount(parseFloat(event.target?.value));
                                    }}
                                />
                            }
                        </div> */}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4 p-2 border-2 rounded-lg">
                    <span className="font-bold">
                        Payee
                    </span>
                    <div className={[
                        "w-full flex justify-center items-center flex-wrap gap-2",
                        "dark:border-gray-500"
                        ].join(" ")}
                    >
                        {payeeIds.map((pid, i) => (
                            readonly ? 
                            <span>
                                {persons.find(p => p.id === pid)?.name}
                            </span> :
                            <PersonSelect 
                                key={i}
                                value={persons.find(p => p.id === pid)}
                                onChange={(newValue: IPerson|null) => {
                                    if (newValue) {
                                        handlePayeeChange(i, newValue);
                                    }
                                }}
                                onClose={() => handlePayeeClose(i)}
                            />
                        ))}

                        {
                            readonly ? null :
                            <IconButton
                                onClick={handleAddPerson}
                            >
                                <AddIcon />
                            </IconButton>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}