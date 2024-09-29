import { Button, Stack, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "@src/common/hooks";
import type { Person } from "@src/features/person/interface";
import { addPerson } from "@src/features/person/slice";
import { useEffect, useId, useMemo, useRef, useState, type ChangeEvent, type ComponentProps, type FormEvent, type MouseEvent } from "react";

interface PersonEditFormProps extends Omit<ComponentProps<"form">,"onSubmit"> {
    person?: Person;
    onSubmit?: (person: Person) => void;
    onCancel?: () => void;
}

export default function PersonEditForm(props: PersonEditFormProps) {
    const {
        person,

        onSubmit,
        onCancel
    } = props

    const dispatch = useAppDispatch();
    
    const id = useId()
    const nameInputRef = useRef<HTMLInputElement>();

    const isNew = person === undefined;

    const [pid, setPid] = useState<string>(person?.id ?? crypto.randomUUID());
    const [name, setName] = useState<string>(person?.name ?? "");
    const [email, setEmail] = useState<string>(person?.email ?? "");
    const [color, setColor] = useState<string>(person?.color ?? "black");

    useEffect(() => {
        nameInputRef.current?.focus();
    }, [nameInputRef]);

    const handleSubmit = function(event: FormEvent<HTMLFormElement>) {
        // Prevent default behavior, which refreshes the page
        event.preventDefault();
        
        onSubmit?.({
            id: pid,
            name,
            email,
            color
        } as Person);
    }

    const handleCancel = function(event: MouseEvent) {
        event.preventDefault();
        onCancel?.();
    }

    const handleNameChange = function(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value as string);
    }

    const handleEmailChange = function(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value as string);
    }

    const handleColorChange = function(event: ChangeEvent<HTMLInputElement>) {
        setColor(event.target.value as string);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={2}>
                <TextField 
                    inputRef={nameInputRef}
                    id={id + "-name-field"}
                    required
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                />
                <TextField 
                    id={id + "-email-field"}
                    label="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField 
                    id={id + "-color-field"}
                    label="Color"
                    value={color}
                    onChange={handleColorChange}
                />
            </Stack>
            <div className="flex justify-end mt-8">
                <Stack direction="row" gap={2}>
                    <Button
                        type="submit"
                        variant="outlined"
                        color="success"
                    >
                        Confirm
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Stack>
            </div>
        </form>
    )
}