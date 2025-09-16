import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useAppSelector } from "@src/common/hooks";
import type { Bill, BillItem } from "@src/features/bill/interface";
import PersonSelect from "@src/features/person/components/PersonSelect";
import type { Person } from "@src/features/person/interface";
import { selectPersons } from "@src/features/person/slice";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type ComponentProps, type FormEvent, type MouseEvent } from "react";

interface BillFormProps extends Omit<ComponentProps<"form">, "onSubmit"> {
    bill?: Bill;

    onSubmit?: (bill: Bill) => void;
    onCancel?: () => void;
    onDelete?: (bill: Bill) => void;
}

export default function BillForm(props: BillFormProps) {
    const {
        bill,

        onSubmit,
        onCancel,
        onDelete,
        ...otherProps
    } = props;

    const persons = useAppSelector(selectPersons);

    const { current: isEdit } = useRef(bill !== undefined);

    const [bid, setBid] = useState(bill?.id ?? crypto.randomUUID());
    const [description, setDescription] = useState(bill?.description || "");
    const [amount, setAmount] = useState(bill?.amount);
    const [tax, setTax] = useState(bill?.tax);
    const [tip, setTip] = useState(bill?.tip);
    const [payerId, setPayerId] = useState(bill?.payerId);

    const [billItems, setBillItems] = useState(bill?.items || []);

    const [createdAt, setCreatedAt] = useState(new Date());

    // Calculate tax
    useEffect(() => {
        const subtotal = billItems.map(bi => bi.amount).reduce((p,c) => p+c, 0) || 0;
        const taxRate = amount ? (amount - subtotal) / amount : 0;

        setTax(taxRate);
    }, [amount, billItems]);

    const taxText = useMemo(() => (
        `${(tax ? tax * 100 : 0).toFixed(2)}%`
    ), [tax]);

    const handleDescriptionChange = function(event: ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value as string);
    }

    const handlePayerChange = function(newPayer: Person) {
        setPayerId(newPayer.id);
    }

    const handleAmountChange = function(event: ChangeEvent<HTMLInputElement>) {
        setAmount(event.target.valueAsNumber);
    }

    const handleTipChange = function(event: ChangeEvent<HTMLInputElement>) {
        setTip(event.target.valueAsNumber);
    }

    const handleItemDescriptionChange = function(event: ChangeEvent<HTMLInputElement>, itemId: string) {
        const newItems = billItems.map(it => {
            if (it.id === itemId) {
                it.description = event.target.value;
            } 
            return it;
        });

        setBillItems(newItems);
    }

    const handleItemAmountChange = function(event: ChangeEvent<HTMLInputElement>, itemId: string) {
        const newAmount = event.target.valueAsNumber;
        const newItems = billItems.map(bi => {
            if (bi.id === itemId) {
                bi.amount = newAmount;
            } 
            return bi;
        });

        setBillItems(newItems);
    }

    const handleItemOrdererChange = function(event: ChangeEvent<HTMLInputElement>, itemId: string) {
        const ordererId = event.target.value;

        const newItems = billItems.map(it => {
            if (it.id === itemId) {
                if (it.ordererIds.includes(ordererId)) {
                    it.ordererIds = it.ordererIds.filter(oid => oid !== ordererId);
                } else {
                    it.ordererIds.push(ordererId);
                }
            }
            return it;
        });

        setBillItems(newItems);
    }

    const handleItemDelete = function(event: MouseEvent, itemId: string) {
        const newItems = billItems.filter(bi => bi.id !== itemId);
        setBillItems(newItems);
    }

    const handleNewBillItemClick = function(event: MouseEvent) {
        setBillItems([
            ...billItems,
            {
                id: crypto.randomUUID(),
                billId: bid,
                order: billItems.length,
                description: "",
                amount: 0,
                ordererIds: []
            } as BillItem
        ])
    }

    const handleSubmit = function(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        onSubmit?.({
            id: bid,
            description,
            amount,
            tax,
            tip,
            payerId,
            items: billItems
        } as Bill);
    }

    const handleCancel = function(event: MouseEvent) {
        event.preventDefault();

        onCancel?.();
    }

    const handleDelete = function(event: MouseEvent) {
        event.preventDefault();
        if (bill) {
            onDelete?.(bill);
        }
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
                        value={persons.find(p => p.id === payerId)}
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
                            type="number"
                            value={tip}
                            onChange={handleTipChange}
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
                            {billItems.map((bi,i) => (
                                <TableRow key={i}>
                                    <TableCell >
                                        <TextField 
                                            size="small"
                                            variant="filled"
                                            inputProps={{
                                                sx: {paddingTop: "8px"}
                                            }}
                                            value={bi.description}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleItemDescriptionChange(event, bi.id)}
                                            
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
                                            value={bi.amount}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleItemAmountChange(event, bi.id)}
                                        />
                                    </TableCell>
                                    {persons.map((p, j) => (
                                        <TableCell key={j}>
                                            <Checkbox 
                                                size="small"
                                                value={p.id}
                                                checked={bi.ordererIds && bi.ordererIds.includes(p.id)}
                                                onChange={(event: ChangeEvent<HTMLInputElement>) => handleItemOrdererChange(event, bi.id)}
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <IconButton 
                                            size="small" 
                                            onClick={(event: MouseEvent) => handleItemDelete(event, bi.id)}
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
                
                <div className="flex justify-between mt-8">
                    <div>
                        {isEdit ? (
                            <Button
                                type="button"
                                variant="outlined"
                                color="error"
                                onClick={handleDelete}
                            >
                                <DeleteIcon />
                            </Button>
                        ) : null}
                    </div>
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