import React, { useContext, useEffect, useRef, useState } from "react";

import AddIcon from '@mui/icons-material/Add';

import Person from "../../interfaces/interfacePerson";
import PersonEntry from "./personEntry";
import CircleButton from "../../components/buttons/circleButton";
import Button from "../../components/buttons/button";
import ErrorMessage from "../../components/errorMessage";
import { DataContext, DataContextProps } from "@src/contexts/dataContext";


export default function PeopleView() {
    const [errorText, setErrorText] = useState("");
    const [showError, setShowError] = useState(false);
    const {persons, createPerson, updatePerson} = useContext(DataContext) as DataContextProps;

    const raiseError = (msg: string) => {
        setErrorText(msg);
        setShowError(true);
    }

    const handleClose = (person: Person) => {
        //
    }

    const handleChange = (person: Person, newPersonName: string) => {
        updatePerson(person.id, {name: newPersonName});
    }

    const handleAddButton = (e: React.SyntheticEvent) => {
        createPerson({name: ""});
    }

    const handleClearClick =(e: React.SyntheticEvent) => {
        if (persons && persons.length === 0) {
            raiseError("There is nothing to clear!")
        } else {
            //
        }
    }

    return (
        <div className={[
                "w-inherit flex flex-col items-center gap-2",
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
            </div>
            <div className={[
                "w-full min-h-16 flex justify-center items-center flex-wrap gap-2 p-2 border-2 rounded-lg",
                "dark:border-gray-500"
                ].join(" ")}
            >
                {
                    persons && persons.length > 0 ? (
                        persons.map((p) => (
                            <PersonEntry 
                                key={p.id}
                                person={p}
                                onClose={handleClose}
                                onChange={handleChange}
                            />
                        ))
                    ) : (
                        <span>Nothing to display</span>
                    )
                }
            </div>
        </div>
    )
}