import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useAppSelector } from "@src/common/hooks";

export default function BillList() {
    const bills = useAppSelector(state => state.bill.bills);

    return (
        <List>
            {bills.map((b, i) => (
                <ListItem key={i}>
                    <ListItemButton>
                        <ListItemText
                            primary={b.description}
                            secondary={b.payer.name}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}