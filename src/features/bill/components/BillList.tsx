import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useAppSelector } from "@src/common/hooks";
import BillBox from "@src/features/bill/components/BillBox";
import BillListItem from "@src/features/bill/components/BillListItem";

export default function BillList() {
    const bills = useAppSelector(state => state.bill.bills);

    return (
        <List>
            {bills.map((b, i) => (
                <ListItem key={i}>
                    <BillBox 
                        item={b} 
                        sx={{cursor: "pointer"}}
                    />
                </ListItem>
            ))}
        </List>
    )
}