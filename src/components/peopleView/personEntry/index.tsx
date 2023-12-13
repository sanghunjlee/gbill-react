import React, { useEffect, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Person from "../../../interfaces/interfacePerson";
import CircleButton from "../../buttons/circleButton";

interface PersonEntryProp {
    person: Person,
    onClose: (person: Person) => void
    onChange: (person: Person, newName: string) => void
}

export default function PersonEntry({
    person, onClose, onChange
}: PersonEntryProp) {
    const inputRef = useRef<HTMLInputElement>(null);
    const spanRef = useRef<HTMLDivElement>(null);
    const [name, setName] = useState(person.name);
    const [isEntry, setIsEntry] = useState(false);

    useEffect(() => {
        if (isEntry && inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEntry]);

    const handleClick = (e: React.MouseEvent) => {
        if (!isEntry) {
            if (inputRef && inputRef.current) {
                inputRef.current.style.width = spanRef.current?.offsetWidth + "px";
            }
            setIsEntry(true);
        }
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
        onChange(person, e.currentTarget.value);
        if (inputRef && inputRef.current) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const fontWeight = window.getComputedStyle(inputRef.current, null).getPropertyValue('font-weight');
            const fontSize = window.getComputedStyle(inputRef.current, null).getPropertyValue('font-size');
            const fontFamily = window.getComputedStyle(inputRef.current, null).getPropertyValue('font-family');
            if (context) context.font = `${fontWeight} ${fontSize} ${fontFamily}`;
            const metrics = context?.measureText(e.currentTarget.value);
            console.log(metrics);
            inputRef.current.style.width = `${Math.max(Math.min((metrics?.width || 0) + 20, 220-16), 80-16)}px`;
        }
    }

    const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
        setIsEntry(false);
    }

    const handleClose = (e: React.SyntheticEvent) => {
        setName("");
        onClose(person);
    }
    
    return (
        <div
            id={`person-entry-${person.id}`}
            className="relative"
        >
            <div
                className={[
                    "peer w-fit min-w-[80px] max-w-[220px] h-[44px] p-2 border-2 rounded-lg text-center overflow-x-clip transition-all",
                    "dark:border-gray-500",
                    "hover:scale-105",
                    isEntry ? "border-black" : "border-inherit"
                ].join(" ")}
                onClick={handleClick}
            >
                <input 
                    type="text" 
                    name="personName"
                    className={[
                        `text-center outline-none transition-all bg-inherit`,
                        "dark:text-gray-100 dark:placeholder:text-gray-600",
                        isEntry ? "" : "hidden"
                    ].join(" ")}
                    aria-autocomplete="none"
                    ref={inputRef}
                    placeholder="name"
                    value={name}
                    onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter' || e.key === 'Tab') {
                            e.preventDefault();
                            inputRef.current?.blur();
                        }
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <div
                    ref={spanRef}
                    className={[
                        "cursor-pointer overflow-x-clip", 
                        "dark:text-gray-100",
                        isEntry ? "hidden" : "",
                        name === "" ? "text-gray-300 dark:text-gray-500" : ""
                    ].join(" ")}
                >
                    <span>{name === "" ? "name" : name}</span>
                </div>
            </div>
            <CircleButton
                className={[
                    "absolute w-[16px] h-[16px] p-1 text-[8px] right-[-6px] top-[-6px] z-10",
                    "flex justify-center items-center opacity-0 [transition:opacity_0.5s]",
                    "peer-hover:opacity-100 hover:opacity-100",
                    "bg-gray-400 hover:bg-red-500 dark:hover:bg-red-500",
                ].join(" ")}
                onClick={handleClose}
            >
                <FaXmark className="text-white font-bold" />
            </CircleButton>
        </div>
    );
}