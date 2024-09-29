import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useAppSelector } from "@src/common/hooks";
import type { Bill, BillItem } from "@src/features/bill/interface";
import PersonSelect from "@src/features/person/components/PersonSelect";
import type { Person } from "@src/features/person/interface";
import { useEffect, useMemo, useState, type ChangeEvent, type ComponentProps, type FormEvent, type MouseEvent } from "react";

interface BillFormProps extends Omit<ComponentProps<"form">, "onSubmit"> {
    bill?: Bill;

    onSubmit?: (bill: Bill) => void;
    onCancel?: () => void;
}

export default function BillForm(props: BillFormProps) {
    const {
        bill,

        onSubmit,
        onCancel,

        ...otherProps
    } = props;

    const { persons } = useAppSelector(state => state.person);

    const [bid, setBid] = useState(bill?.id ?? crypto.randomUUID());
    const [description, setDescription] = useState(bill?.description ?? "");
    const [amount, setAmount] = useState(bill?.amount);
    const [_tax, setTax] = useState<number>();
    const [tip, setTip] = useState(bill?.tip);
    const [payer, setPayer] = useState(bill?.payer);
    const [items, setItems] = useState(bill?.items ?? []);

    const [createdAt, setCreatedAt] = useState(new Date());

    // Calculate tax
    useEffect(() => {
        const subtotal = items.map(it => it.amount).reduce((p,c) => p+c, 0) || 0;
        const taxRate = amount ? (amount - subtotal) / amount : 0;

        setTax(taxRate);
    }, [amount, items]);

    const taxText = useMemo(() => (
        `${(_tax ? _tax * 100 : 0).toFixed(2)}%`
    ), [_tax]);

    const handleDescriptionChange = function(event: ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value as string);
    }

    const handlePayerChange = function(newPayer: Person) {
        setPayer(newPayer);
    }

    const handleAmountChange = function(event: ChangeEvent<HTMLInputElement>) {
        setAmount(event.target.valueAsNumber);
    }

    const handleItemDescriptionChange = function(event: ChangeEvent<HTMLInputElement>, itemId: string) {
        const newItems = items.map(it => {
            if (it.id === itemId) {
                it.description = event.target.value;
            } 
            return it;
        });

        setItems(newItems);
    }

    const handleItemAmountChange = function(event: ChangeEvent<HTMLInputElement>, itemId: string) {
        const newAmount = event.target.valueAsNumber;
        const newItems = items.map(it => {
            if (it.id === itemId) {
                it.amount = newAmount;
            } 
            return it;
        });

        setItems(newItems);
    }

    const handleItemOrdererChange = function(event: ChangeEvent<HTMLInputElement>, itemId: string) {
        const person = persons.find(p => p.id === event.target.value);
        if (person === undefined) return;

        const newItems = items.map(it => {
            if (it.id === itemId) {
                if (it.orderers.includes(person)) {
                    it.orderers = it.orderers.filter(o => o.id !== person.id);
                } else {
                    it.orderers.push(person);
                }
            }
            return it;
        });

        setItems(newItems);
    }

    const handleItemDelete = function(event: MouseEvent, itemId: string) {
        const newItems = items.filter(it => it.id !== itemId);
        setItems(newItems);
    }

    const handleNewBillItemClick = function(event: MouseEvent) {
        setItems([
            ...items,
            {
                id: crypto.randomUUID(),
                order: items.length,
                description: "",
                amount: 0,
                orderers: []
            } as BillItem
        ])
    }

    const handleSubmit = function(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        onSubmit?.({
            id: bid,
            description,
            amount,
            tip,
            payer,
            items
        } as Bill);
    }

    const handleCancel = function(event: MouseEvent) {
        event.preventDefault();

        onCancel?.();
    }

    return (
        <form
            onSubmit={handleSubmit}
            {...otherProps}
        >
            <Stack gap={2}>
                <div className="w-full flex justify-between">
                    <span>{bid}</span>
                    <span>{createdAt.toLocaleDateString()}</span>
                </div>
                <TextField 
                    required
                    label={"Description"}
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <Stack direction={"row"} gap={2} sx={{justifyContent: "space-between"}}>
                    <PersonSelect 
                        required
                        label="Payer"
                        value={payer}
                        onChange={handlePayerChange}
                        sx={{minWidth: "210px"}}
                    />
                    <Stack gap={1}>
                        <TextField 
                            required
                            label="Total Amount"
                            type="number"
                            helperText={`Calculated tax rate: ${taxText}`}
                            value={amount}
                            onChange={handleAmountChange}
                        />
                        <TextField
                            label="Tip"
                        />
                    </Stack>
                </Stack>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{minWidth: "200px"}}
                                >
                                    Bill Item
                                </TableCell>
                                <TableCell
                                    sx={{minWidth: "150px"}}
                                >
                                    Amount
                                </TableCell>
                                {persons.map((p, i) => (
                                    <TableCell key={i}>
                                        {p.name}
                                    </TableCell>
                                ))}
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items?.map((r,i) => (
                                <TableRow key={i}>
                                    <TableCell >
                                        <TextField 
                                            size="small"
                                            variant="filled"
                                            inputProps={{
                                                sx: {paddingTop: "8px"}
                                            }}
                                            value={r.description}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleItemDescriptionChange(event, r.id)}
                                            
                                        />
                                    </TableCell>
                                    <TableCell >
                                        <TextField 
                                            type="number"
                                            size="small"
                                            variant="filled"
                                            inputProps={{
                                                sx: {paddingTop: "8px"}
                                            }}
                                            value={r.amount}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleItemAmountChange(event, r.id)}
                                        />
                                    </TableCell>
                                    {persons.map((p, j) => (
                                        <TableCell key={j}>
                                            <Checkbox 
                                                size="small"
                                                value={p.id}
                                                checked={r.orderers && r.orderers.includes(p)}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) => handleItemOrdererChange(event, r.id)}
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <IconButton 
                                            size="small" 
                                            onClick={(event: MouseEvent) => handleItemDelete(event, r.id)}
                                        >
                                            <DeleteIcon fontSize="inherit"/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button 
                    fullWidth 
                    type="button" 
                    sx={{
                        "&:hover": {
                            transform: "unset"
                        }
                    }}
                    onClick={handleNewBillItemClick}
                >
                    Add a new bill item
                </Button>
                
                <div className="flex justify-end mt-8">
                    <Stack direction="row" gap={2}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="success"
                        >
                            Confirm
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            color="error"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </div>
            </Stack>
        </form>
    )
}