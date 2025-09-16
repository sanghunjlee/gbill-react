import { Box, IconButton, Typography, type BoxProps } from "@mui/material";
import type { Person } from "@src/features/person/interface";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch } from "@src/common/hooks";
import { removePerson } from "@src/features/person/slice";

interface PersonBoxProps extends BoxProps {
    person: Person;
}

export default function PersonBox(props: PersonBoxProps) {
    const {
        person,
        onClick,
        sx: sxProps,
        ...otherProps
    } = props;

    const dispatch = useAppDispatch();
    const [hover, setHover] = useState(false);
    const [dblClicked, setDblClicked] = useState(false);

    useEffect(() => {
        if (!hover) {
            setDblClicked(false);
            return;
        }

        if (dblClicked) {
            const timeoutId = setTimeout(() => {
                setDblClicked(false);
            }, 200);

            return (() => {
                clearTimeout(timeoutId);
            })
        }
    }, [hover, dblClicked])

    const initials = useMemo(() => 
        person.name.split(' ').map(n => n.charAt(0).toUpperCase()).join(""), 
    [person]);

    const handleDelete = function(event: MouseEvent) {
        dispatch(removePerson(person));
    }

    return (
        <Box
            sx={{
                position: "relative",
                minWidth: {
                    xs: 60,
                    lg: 120
                },
                maxWidth: {
                    xs: 120,
                    lg: 360
                },
                px: {
                    xs: 2,
                    lg: 4
                },
                py: {
                    xs: 1,
                    lg: 2
                },
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: hover ? "primary.main" : "grey.400",
                borderRadius: 2,
                outline: hover ? 1 : 0,
                outlineColor: "primary.main",
                cursor: "pointer",
            }}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            {...otherProps}
        >
            <div className="flex justify-center items-center gap-2 select-none">
                <Typography>{person.name}</Typography>
            </div>
        </Box>
    )
}