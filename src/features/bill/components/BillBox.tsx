import { Box, IconButton, Typography, type BoxProps } from "@mui/material";
import type { Bill } from "@src/features/bill/interface";
import DeleteIcon from "@mui/icons-material/Delete";
import { currencyToString } from "@src/common/helpers/currencyHelper";
import { useState } from "react";
import { useAppSelector } from "@src/common/hooks";
import { selectPersonById } from "@src/features/person/slice";

interface BillBoxProps extends BoxProps {
    item: Bill;
}

export default function BillBox(props: BillBoxProps) {
    const {
        item,
        sx: sxProp,
        ...otherProps
    } = props;
    const payer = useAppSelector((state) => selectPersonById(state, item.payerId));
    const [hover, setHover] = useState(false);


    return (
        <Box
            sx={{
                width: "100%",
                padding: 0,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: hover ? "primary.main" : "grey.400",
                borderRadius: 2,
                outline: hover ? 1 : 0,
                outlineColor: "primary.main",
                userSelect: "none",
                ...sxProp 
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            {...otherProps}
        >
            
            <div className="relative group w-full flex flex-col">
                <div className="w-full py-2 px-4 ">
                    <Typography variant="h5" color="textPrimary">{item.description}</Typography>
                </div>
                <hr />
                <div className="w-full py-2 px-4 grid grid-cols-3 md:grid-cols-5 gap-x-4">
                    <div className="md:col-span-3 flex justify-start gap-2">
                        <Typography variant="body1">Payer:</Typography>
                        <Typography variant="body1" color="textSecondary">
                            {payer?.name}
                        </Typography>
                    </div>
                    <div className="md:col-span-1 w-full flex justify-end gap-2">
                        <Typography variant="body1">Total:</Typography>
                        <Typography variant="body1" color="textSecondary">
                            {currencyToString(item.amount)}
                        </Typography>
                    </div>
                    <div className="md:col-span-1 w-full flex justify-end gap-2">
                        <Typography variant="body1">Tip:</Typography>
                        <Typography variant="body1" color="textSecondary">
                            {currencyToString(item.tip)}
                        </Typography>
                    </div>
                </div>
            </div>
        </Box>
    )
}