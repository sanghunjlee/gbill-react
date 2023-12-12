import React, { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {}

export default function Button({ id, className, onClick, children }: ButtonProps) {
    return (
        <button 
            id={id}
            className={[
                className,
                "p-2 rounded-lg transition bg-gray-100",
                "dark:text-gray-100 dark:border-gray-500",
                "hover:scale-110 hover:bg-gray-200"
            ].join(" ")}
            onClick={onClick}
        >
            {children}
        </button>
    )
}