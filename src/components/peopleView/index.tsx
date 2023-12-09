import React, { useEffect, useRef, useState } from "react";

import { FaPlus } from "react-icons/fa";

import PersonEntry from "../personEntry";

export default function PeopleView() {
    const errorRef = useRef<HTMLDivElement>(null);
    const [isError, setIsError] = useState(false);
    const [persons, setPersons] = useState<string[]>([])

    useEffect(() => {
        if (isError) {
            if (errorRef.current) {
                errorRef.current.style.opacity = '1';
                errorRef.current.style.visibility = 'visible';
                errorRef.current.style.height = '20px';
            }
            const timer = setTimeout(() => {
                setIsError(false);
            }, 3000);
            return () => clearTimeout(timer)
        } else {
            if (errorRef.current) {
                errorRef.current.style.opacity = '0';
                errorRef.current.style.visibility = 'hidden';
                errorRef.current.style.height = '0px';
            }
        }
    }, [isError])

    const handleClose = (targetName: string) => {
        setPersons(persons.filter(p => p !== targetName));
    }

    const handleChange = (currentPersonName: string, newPersonName: string) => {
        setPersons(persons.map(p => p === currentPersonName ? newPersonName : p));
    }

    const personEntries = persons.map((p, i) => (
        <PersonEntry 
            key={i}
            personName={p}
            onClose={handleClose}
            onChange={handleChange}
        />
    ))

    const handleButton = (e: React.SyntheticEvent) => {
        console.log('handlebutton');
        if (!persons.includes("")) {
            setPersons([...persons, ""]);
        } else {
            setIsError(true);
        }
    }

    return (
        <div className={[
                "w-inherit m-2 p-2 flex flex-col items-center gap-2",
            ].join(" ")}
        >
            <div className="w-full px-2">
                <h1 className="text-xl font-medium dark:text-gray-100">Payers & Payees</h1>
            </div>
            <div 
                ref={errorRef}
                className={[
                    "text-sm text-error h-0 overflow-clip opacity-0 invisible",
                    "dark:text-red-500",
                    isError ? "[transition:opacity_1s_0.2s,visibility_0.5s,height_0.5s]" : "[transition:opacity_1s,visibility_0.5s,height_0.5s_0.4s]",
                ].join(" ")}
            >
                <p>You cannot create more than one empty name!</p>
            </div>
            <div className={[
                "w-full flex justify-center flex-wrap gap-2 p-2 border-2 rounded-lg",
                "dark:border-gray-500"
                ].join(" ")}
            >
                {personEntries}
                <button
                    className={[
                        "w-[40px] p-2 border-2 rounded-lg flex justify-center items-center",
                        "dark:text-gray-100 dark:border-gray-500",
                        "hover:scale-105 hover:text-gray-500"
                    ].join(" ")}
                    onClick={handleButton}
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    )
}