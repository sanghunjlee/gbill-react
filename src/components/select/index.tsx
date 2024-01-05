import { ComponentProps, useEffect, useRef, useState } from "react"
import { FaAngleDown } from "react-icons/fa";


interface SelectProps extends Omit<ComponentProps<"div">, 'onChange'> {
    selectedIndex?: number
    options: string[],
    onChange?: (newIndex: number) => void
}

export default function Select({ className, selectedIndex, options, onChange }: SelectProps) {
    const selectRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(selectedIndex || 0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (evt: Event) => {
            if (selectRef.current && !selectRef.current.contains(evt.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClick, true);
        return () => {
            document.removeEventListener('click', handleOutsideClick, true);
        }
    }, [open])

    const handleChange = (newIndex: number) => {
        setIndex(newIndex);
        if (onChange) onChange(newIndex);
    }

    return (
        <div 
            ref={selectRef}
            className={[
                "relative cursor-pointer select-none w-full",
                className
            ].join(" ")}
            onClick={() => { setOpen(!open); }}
        >
            <div className="h-full flex items-center gap-2 flex-between px-2">
                <div
                    className={[
                        "h-full"
                    ].join(" ")}
                >
                    <span>{options[index]}</span>
                </div>
                <span><FaAngleDown /></span>
            </div>
            <div
                className={[
                    "absolute z-20 left-0 right-0 mt-2",
                    "border-2 rounded-md bg-white",
                    "dark:bg-gray-800",
                    open ? "opacity-100 visible" : "opacity-0 invisible",
                ].join(" ")}
            >
                {options.map((opt, i) => (
                    <div
                        key={i}
                        className={[
                            "px-2",
                            "hover:bg-gray-100",
                            "dark:hover:bg-gray-600"
                        ].join(" ")}
                        onClick={() => handleChange(i)}
                    >
                        <span>{opt}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}