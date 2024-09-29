import { Box, type BoxProps } from "@mui/material";
import type { Bill } from "@src/features/bill/interface";

interface BillBoxProps extends BoxProps {
    bill: Bill;
}

export default function BillBox(props: BillBoxProps) {
    const {
        bill,
        ...otherProps
    } = props;

    return (
        <Box
            {...otherProps}
        >
            
        </Box>
    )
}