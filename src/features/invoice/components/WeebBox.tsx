import { useTheme } from "@emotion/react";
import { Box, BoxProps, Stack, styled, Tooltip, Typography } from "@mui/material";
import { currencyToString } from "@src/common/helpers/currencyHelper";
import { useAppSelector } from "@src/common/hooks";
import { Weeb } from "@src/features/invoice/interface";
import { selectPersons } from "@src/features/person/slice";
import { useMemo, useState } from "react";

interface WeebBoxProps extends BoxProps {
    weeb: Weeb;
}

export default function WeebBox(props: WeebBoxProps) {
    const {
        weeb,
        sx: sxProp,
        ...otherProps
    } = props;

    const persons = useAppSelector(selectPersons);
    
    const [hover, setHover] = useState(false);

    const weebName = useMemo(() => {
        return persons.find(p => p.id === weeb.id)?.name || "";
    }, [persons, weeb]);


    return (
        <Box
            sx={{
                width: "fit-content",
                minWidth: "100px",
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
            <div className="p-2">
                <Stack sx={{alignItems: "center"}}>
                    <Typography variant="h6">
                        {weebName}
                    </Typography>
                    <Typography variant="body1" color="primary">
                        {currencyToString(weeb.profit)}
                    </Typography>
                    <Typography variant="body1" color="error">
                        -{currencyToString(weeb.debt)}
                    </Typography>
                </Stack>
            </div>
        </Box>
    )
}