import { ComponentProps } from "react";
import "./circleButton.css";

interface ButtonProps extends ComponentProps<"button"> {}

export default function CircleButton({ id, className, onClick, children }: ButtonProps) {
    return (
        <button 
            id={id}
            className={[
                "dark:text-gray-100 dark:bg-gray-500 dark:hover:bg-gray-400",
                className,    
            ].join(" ")}
            onClick={onClick}
        >
            {children}
        </button>
    )
}