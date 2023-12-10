import React, { useEffect, useRef, useState } from "react";

import { FaPlus } from "react-icons/fa";

import Person from "../../interfaces/perons";
import PersonEntry from "./personEntry";
import CircleButton from "../buttons/circleButton";
import Button from "../buttons/button";

export default function PeopleView() {
    const errorRef = useRef<HTMLDivElement>(null);
    const [isError, setIsError] = useState(false);
    const [persons, setPersons] = useState<Person[]>([])

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

    const raiseError = (errorMessage: string) => {
        if (errorRef && errorRef.current) {
            errorRef.current.innerHTML = `<p>${errorMessage}</p>`;
            setIsError(true);
        }
    }

    const handleClose = (person: Person) => {
        const newPersons = persons.filter((p) => p.id !== person.id);
        console.log(newPersons);
        setPersons(newPersons);
    }

    const handleChange = (person: Person, newPersonName: string) => {
        const newPersons = persons.map((p) => {
            if (p.id === person.id) {
                p.name = newPersonName;
            }
            return p;
        });
        setPersons(newPersons);
    }

    const handleAddButton = (e: React.SyntheticEvent) => {
        let newId = persons.length > 0 ? persons[persons.length-1].id + 1 : 0;
        if (newId !== persons.length) {
            for (let i=0; i<persons.length; i++) {
                if (i > 0 && persons[i-1].id + 1 !== persons[i].id){
                    newId = persons[i-1].id + 1;
                    break;
                }
            }
        }

        const newPerson: Person = {
            id: newId,
            name: ""
        }

        setPersons([...persons, newPerson]);
    }

    const handleClearClick =(e: React.SyntheticEvent) => {
        if (persons.length === 0) {
            raiseError("There is nothing to clear!")
        } else {
            setPersons([]);
        }
    }

    const personEntries = persons.map((p) => (
        <PersonEntry 
            key={p.id}
            person={p}
            onClose={handleClose}
            onChange={handleChange}
        />
    ));

    return (
        <div className={[
                "w-inherit m-2 p-2 flex flex-col items-center gap-2",
            ].join(" ")}
        >
            <div className="w-full px-2">
                <h1 className="text-xl font-medium dark:text-gray-100">Payers & Payees</h1>
            </div>
            <div className="w-full flex">
                <span className="flex-1" />
                <div className="flex-1 flex justify-center items-center">
                    <div 
                        ref={errorRef}
                        className={[
                            "text-sm text-error overflow-clip opacity-0 invisible [transition:opacity_1s,visibility_0.5s]",
                            "dark:text-red-500",
                        ].join(" ")}
                    >
                    </div>
                </div>
                <div className="flex-1 flex justify-end">
                    <Button
                        className="px-4 py-2 text-sm font-bold"
                        onClick={handleClearClick}
                    >
                        Clear
                    </Button>
                </div>
            </div>
            <div className={[
                "w-full flex justify-center flex-wrap gap-2 p-2 border-2 rounded-lg",
                "dark:border-gray-500"
                ].join(" ")}
            >
                {personEntries}
                <CircleButton
                    id="add-person-button"
                    className="w-[40px] h-[40px] p-2 flex justify-center items-center"
                    onClick={handleAddButton}
                >
                    <FaPlus />
                </CircleButton>
            </div>
        </div>
    )
}