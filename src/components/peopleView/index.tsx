import React, { useEffect, useRef, useState } from "react";

import { FaPlus } from "react-icons/fa";

import Person from "../../interfaces/perons";
import PersonEntry from "../personEntry";
import Button from "../buttons/button";
import CircleButton from "../buttons/circleButton";

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