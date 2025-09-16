import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, ListItem, ListItemButton, Typography, type ListItemProps } from "@mui/material";
import { useAppSelector } from "@src/common/hooks";
import type { Bill } from "@src/features/bill/interface";
import { selectPersons } from "@src/features/person/slice";
import { useMemo } from "react";


interface BillListItemProps extends ListItemProps {
    item: Bill;
}

export default function BillListItem(props: BillListItemProps) {
    const {
        item,

        ...otherProps
    } = props;

    const persons = useAppSelector(selectPersons);

    const payer = useMemo(() => (
        persons.find(p => p.id === item.payerId)
    ), [persons]);

    return (
        <ListItem
            disablePadding={true}
            {...otherProps}
        >
            <Box
                sx={{
                    width: "100%",
                    padding: 0,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "primary.main",
                    borderRadius: 2,
                }}
            >
                <div className="group w-full py-2 px-4 grid grid-cols-3 md:grid-cols-5">
                    <div className="absolute right-1 top-1 z-10 hidden group-hover:block">
                        <IconButton size="small">
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                    <div className="col-span-2 md:col-span-4">
                        <Typography variant="h5" color="textPrimary">{item.description}</Typography>
                    </div>
                    <div className="blank-spot-for-buttons"/>
                    <div className="md:col-span-3">
                        <Typography variant="body1" color="textSecondary">
                            Payer: {payer?.name}
                        </Typography>
                    </div>
                    <div className="md:col-span-1">
                        <Typography variant="body1" color="textSecondary">
                            {item.amount}
                        </Typography>
                    </div>
                    <div className="md:col-span-1">
                        <Typography variant="body1" color="textSecondary">
                            {item.tip}
                        </Typography>
                    </div>
                </div>
            </Box>
        </ListItem>
    )
}