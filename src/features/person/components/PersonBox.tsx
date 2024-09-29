import { Box, IconButton, Typography } from "@mui/material";
import type { Person } from "@src/features/person/interface";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch } from "@src/common/hooks";
import { removePerson } from "@src/features/person/slice";

interface PersonBoxProps {
    person: Person;
    onDblClicked?: (event: MouseEvent) => void;
}

export default function PersonBox(props: PersonBoxProps) {
    const {
        person,
        onDblClicked
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

    const handleBoxClick = function(event: MouseEvent) {
        if (dblClicked) {
            onDblClicked?.(event);
            setDblClicked(false);
        }

        setDblClicked(true);
    }

    const handleDelete = function(event: MouseEvent) {
        dispatch(removePerson(person));
    }

    return (
        <Box
            sx={{
                position: "relative",
                width: {
                    xs: 60,
                    lg: 120
                },
                p: {
                    sm: 1,
                    lg: 2
                },
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "primary.main",
                borderRadius: 2,
                cursor: "pointer",
            }}
            onClick={handleBoxClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {hover ? (
                <div className="absolute right-0 top-0">
                    <IconButton aria-label="Delete" size="small" onClick={handleDelete}>
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                </div>
            ) : null}
            <div className="flex justify-center items-center gap-2 select-none">
                <div>
                    <Typography>{person.name}</Typography>
                </div>
            </div>
        </Box>
    )
}