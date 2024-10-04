import { forwardRef, type ComponentProps, type ReactElement } from "react";

interface DivInputProps extends ComponentProps<"div"> {
    inputSlot: JSX.Element | ReactElement;
    inputProps: any;
}

export default function DivInput(props: DivInputProps) {
    const {
        inputSlot,
        inputProps,
        ...otherProps
    } = props;

    
    
    return (
        <div>
            <div>

            </div>
            
        </div>
    )
}