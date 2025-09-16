import { TextField, useEventCallback, type StandardTextFieldProps } from "@mui/material";
import { useEffect, useRef, useState, type ChangeEvent, type ComponentProps, type FocusEvent, type MouseEvent } from "react";

interface DivTextFieldProps extends StandardTextFieldProps {
    divProps?: ComponentProps<"div">;
    readonly?: boolean;
}

export default function DivTextField(props: DivTextFieldProps) {
    const {
        divProps = {},
        readonly,
        value,
        onChange: onChangeProp,
        onBlur,
        ...otherProps
    } = props;

    const {
        className: classNameProp,
        hidden: hiddenProp,
        onClick: onDivClick,
        style: styleProp,
        ...otherDivProps
    } = divProps;

    const divRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [isEdit, setIsEdit] = readonly ? [false, () => {}] : useState(false);

    useEffect(() => {
        const onBlur = () =>{
            setIsEdit(false);
        };

        if (inputRef.current) {
            if (isEdit && inputRef.current !== document.activeElement) {
                inputRef.current.focus();
            }
            inputRef.current.addEventListener("blur", onBlur);
        }
        return (() => {
            inputRef.current?.removeEventListener("blur", onBlur);
        });
    }, [isEdit, inputRef])

    const handleClick = function(event: MouseEvent<HTMLDivElement>) {
        if (!isEdit) {
            event.preventDefault();

            setIsEdit(true);
            onDivClick?.(event);
        }
    }

    return (
        <div className="w-full ">
            <div
                ref={divRef}
                className={[
                    "w-full min-h-[23px] px-[14px] py-[16.5px] border-[1px] rounded-[4px] border-transparent",
                    readonly ? "" : "cursor-pointer hover:border-inherit"
                ].join(" ")}
                hidden={isEdit}
                onClick={handleClick}
                {...otherDivProps}
            >
                <span className="">
                    {(value as string) || '\xa0'}
                </span>
            </div>
            {readonly ? null : (
                <div
                    hidden={!isEdit}
                >
                    <TextField 
                        fullWidth
                        inputRef={inputRef}
                        value={value}
                        onChange={onChangeProp}
                        {...otherProps}
                    />
                </div>
            )}
        </div>
    )
}