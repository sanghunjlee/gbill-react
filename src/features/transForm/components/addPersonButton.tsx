import AddIcon from "@mui/icons-material/Add";
import { IconButton, TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useId, useRef, useState } from "react";

interface AddPersonButtonProps extends Omit<TextFieldProps, "fullWidth"|"inputRef"|"value"|"onChange"|"onBlur"|"onKeyDown"> {
    onAddPerson?: (personName: string) => void
}

export default function AddPersonButton(
    props: AddPersonButtonProps
) {
    const id = useId();
    const textInputRef = useRef<HTMLInputElement|null>(null);
    const [state, setState] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        if (state) {
            textInputRef.current?.focus();
        }
    }, [state]);

    const handleAddPerson = () => {
        setState(false);
        if (text) {
            props.onAddPerson?.(text)
        }
        setText("");
    }

    return (
        <div id={`${id}-addperson-container`}>
            <div 
                className={[
                    "transition-all",
                    state ? "block visible w-[180px]" : "hidden invisible w-0"
                ].join(" ")}
            >
                <TextField 
                    id={`${id}-addperson-text`}
                    fullWidth
                    inputRef={textInputRef}
                    value={text}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        event.preventDefault();
                        setText(event.target.value)
                    }}
                    onBlur={handleAddPerson}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === "Enter" || event.key === "Tab") {
                            event.preventDefault();
                            handleAddPerson();
                        }
                    }}
                    {...props}
                />
            </div>
            <div
                className={[
                    "py-[8px] transition-all",
                    state ? "hidden w-0" : "block w-[40px]"
                ].join(" ")}
            >
                <IconButton
                    id={`${id}-addperson-button`}
                    onClick={() => setState(true)}
                >
                    <AddIcon />
                </IconButton>
            </div>
        </div>
    );
}