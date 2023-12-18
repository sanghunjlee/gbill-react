import { Form, redirect, useNavigate } from "react-router-dom";
import { getPerson, getPersons } from "../../../data/persons";
import PersonEntry from "../../../components/peopleView/personEntry";
import CircleButton from "../../../components/buttons/circleButton";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import Person from "../../../interfaces/interfacePerson";
import Button from "../../../components/buttons/button";
import PayeeSelect from "../../../components/payeeSelect";
import { createTransaction } from "../../../data/transactions";
import Select from "../../../components/select";
import TransForm from "../../../components/transForm";
import Transaction, { PartialTransaction } from "../../../interfaces/interfaceTransaction";


export default function TransAdd() {
    const navigate = useNavigate();
    
    const onSubmit = (transaction: PartialTransaction) => {
        createTransaction(
            transaction
        );
        navigate(-1);
    };

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <TransForm 
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </>
    )
}