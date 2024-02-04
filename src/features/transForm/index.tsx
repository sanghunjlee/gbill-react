import { ChangeEvent, useContext, useState } from "react";
import Transaction, { PartialTransaction } from "../../interfaces/interfaceTransaction";
import CircleButton from "../../components/buttons/circleButton";
import PersonSelect from "./components/personSelect";
import Person from "../../interfaces/interfacePerson";
import AddIcon from '@mui/icons-material/Add';
import { Button, Switch } from "@mui/material";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import { DataContext, DataContextProps } from "@src/contexts/dataContext";
import NumberField from "@src/components/numberField";


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
    const {persons} = useContext(DataContext) as DataContextProps;
    const [amount, setAmount] = useState(initialValue ? initialValue.amount : undefined);
    const [desc, setDesc] = useState(initialValue ? initialValue.desc : '');
    const [payeeIds, setPayeeIds] = useState(initialValue ? initialValue.payeeIds : [persons[0].id]);
    const [payerId, setPayerId] = useState(initialValue ? initialValue.payerId : persons[0].id);
    const [readonly, setReadonly] = useState(_readonly || false);

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

    const handleDescChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target?.value);
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
        const newPayeeId = persons[0]?.id;
        console.log(newPayeeId);
        if (newPayeeId !== undefined) {
            const newPayeeIds = [...payeeIds, newPayeeId];
            setPayeeIds(newPayeeIds);
        }
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
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <NumberField />
                        
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
                                onClose={() => handlePayeeClose(i)}
                            />
                        ))}

                        {
                            readonly ? <></> :
                            <CircleButton
                                id="add-person-button"
                                className="w-[40px] h-[40px] p-2 flex justify-center items-center"
                                onClick={handleAddPayeeButton}
                            >
                                <AddIcon />
                            </CircleButton>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}