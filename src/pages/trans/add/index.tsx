import { Form, redirect, useNavigate } from "react-router-dom";
import { getPerson, getPersons } from "../../../data/persons";
import PersonEntry from "../../../components/peopleView/personEntry";
import CircleButton from "../../../components/buttons/circleButton";
import { FaPlus } from "react-icons/fa";
import { useContext, useState } from "react";
import Person from "../../../interfaces/interfacePerson";
import Button from "../../../components/buttons/button";
import PayeeSelect from "../../../components/payeeSelect";
import { createTransaction } from "../../../data/transactions";
import Select from "../../../components/select";
import TransForm from "../../../components/transForm";
import Transaction, { PartialTransaction } from "../../../interfaces/interfaceTransaction";
import { DataContext } from "../../../contexts/pageContext";


export default function TransAdd() {
    const navigate = useNavigate();
    const {updateTransactions} = useContext(DataContext);

    const onSubmit = (transaction: PartialTransaction) => {
        createTransaction(
            transaction
        );
        updateTransactions();
        navigate(-1);
    };

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <TransForm 
                title="Add a New Transaction"
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </>
    )
}