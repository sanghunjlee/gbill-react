import { ComponentProps, useEffect, useRef } from "react";

interface ErrorMessageProps extends ComponentProps<"div"> {
    text: string,
    visible: boolean,
    setVisible: (val: boolean) => void
}

export default function ErrorMessage({text, visible, setVisible}: ErrorMessageProps) {
    const errorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);
        return () => clearTimeout(timer)
        // if (_visible) {
        //     if (errorRef.current) {
        //         errorRef.current.style.opacity = '1';
        //         errorRef.current.style.visibility = 'visible';
        //         errorRef.current.style.height = '20px';
        //     }
        // } else {
        //     if (errorRef.current) {
        //         errorRef.current.style.opacity = '0';
        //         errorRef.current.style.visibility = 'hidden';
        //         errorRef.current.style.height = '0px';
        //     }
        // }
    }, [visible]);

    return (
        <div 
            ref={errorRef}
            className={[
                "text-sm text-error overflow-clip [transition:opacity_1s,visibility_0.5s]",
                "dark:text-red-500",
                visible ? "opacity-100 visible" : "opacity-0 invisible"
            ].join(" ")}
        >
            <span>{text}</span>
        </div>
    )
}