import { Box, type BoxProps } from "@mui/material";
import type { BillItem } from "@src/features/bill/interface";

interface BillItemBoxProps extends BoxProps {
    item: BillItem;
}

export default function BillItemBox(props: BillItemBoxProps) {
    const {
        item,
        ...otherProps
    } = props;

    return (
        <Box
            {...otherProps}
        >
            
        </Box>
    )
}