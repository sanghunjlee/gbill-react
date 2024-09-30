import { Box, IconButton, Typography, type BoxProps } from "@mui/material";
import type { Bill } from "@src/features/bill/interface";
import DeleteIcon from "@mui/icons-material/Delete";

interface BillBoxProps extends BoxProps {
    item: Bill;
}

export default function BillBox(props: BillBoxProps) {
    const {
        item,
        sx: sxProp,
        ...otherProps
    } = props;

    return (
        <Box
            sx={{
                width: "100%",
                padding: 0,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "primary.main",
                borderRadius: 2,
                userSelect: "none",
                ...sxProp 
            }}
            {...otherProps}
        >
            
            <div className="relative group w-full py-2 px-4 grid grid-cols-3 md:grid-cols-5">
                <div className="col-span-2 md:col-span-4">
                    <Typography variant="h5" color="textPrimary">{item.description}</Typography>
                </div>
                <div className="blank-spot-for-buttons"/>
                <div className="md:col-span-3">
                    <Typography variant="body1" color="textSecondary">
                        Payer: {item.payer.name}
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
    )
}