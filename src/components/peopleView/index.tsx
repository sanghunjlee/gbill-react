import React, { useContext, useEffect, useRef, useState } from "react";

import { FaPlus } from "react-icons/fa";

import Person from "../../interfaces/interfacePerson";
import PersonEntry from "./personEntry";
import CircleButton from "../buttons/circleButton";
import Button from "../buttons/button";
import { createPerson, deleteAllPersons, deletePerson, getPersons, updatePerson } from "../../data/persons";
import ErrorMessage from "../errorMessage";
import { DataContext } from "../../contexts/pageContext";


export default function PeopleView() {
    const [errorText, setErrorText] = useState("");
    const [showError, setShowError] = useState(false);
    const {persons, updatePersons} = useContext(DataContext);

    const raiseError = (msg: string) => {
        setErrorText(msg);
        setShowError(true);
    }

    const handleClose = (person: Person) => {
        deletePerson(person.id);
        updatePersons()
    }

    const handleChange = (person: Person, newPersonName: string) => {
        updatePerson(person.id, {name: newPersonName});
        updatePersons()
    }

    const handleAddButton = (e: React.SyntheticEvent) => {
        createPerson({ name: ""});
        updatePersons()
    }

    const handleClearClick =(e: React.SyntheticEvent) => {
        if (persons && persons.length === 0) {
            raiseError("There is nothing to clear!")
        } else {
            deleteAllPersons();
            updatePersons()
        }
    }

    const personEntries = persons?.map((p) => (
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
                    <ErrorMessage 
                        text={errorText}
                        visible={showError}
                        setVisible={setShowError}
                    />
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