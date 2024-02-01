import React, { useContext, useEffect, useRef, useState } from "react";

import AddIcon from '@mui/icons-material/Add';

import Person from "../../interfaces/interfacePerson";
import PersonEntry from "./personEntry";
import CircleButton from "../../components/buttons/circleButton";
import Button from "../../components/buttons/button";
import { createPerson, deleteAllPersons, deletePerson, getPersons, updatePerson } from "../../utils/services/persons";
import ErrorMessage from "../../components/errorMessage";
import { DataContext, DataContextProps } from "@src/contexts/dataContext";


export default function PeopleView() {
    const [errorText, setErrorText] = useState("");
    const [showError, setShowError] = useState(false);
    const {persons, reloadPersons} = useContext(DataContext) as DataContextProps;

    const raiseError = (msg: string) => {
        setErrorText(msg);
        setShowError(true);
    }

    const handleClose = (person: Person) => {
        deletePerson(person.id);
        reloadPersons()
    }

    const handleChange = (person: Person, newPersonName: string) => {
        updatePerson(person.id, {name: newPersonName});
        reloadPersons()
    }

    const handleAddButton = (e: React.SyntheticEvent) => {
        createPerson({ name: ""});
        reloadPersons()
    }

    const handleClearClick =(e: React.SyntheticEvent) => {
        if (persons && persons.length === 0) {
            raiseError("There is nothing to clear!")
        } else {
            deleteAllPersons();
            reloadPersons()
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
                    <AddIcon />
                </CircleButton>
            </div>
        </div>
    )
}