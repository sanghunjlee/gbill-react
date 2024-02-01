import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { createTransaction } from "@src/utils/services/transactions";
import TransForm from "@src/features/transForm";
import { PartialTransaction } from "@src/interfaces/interfaceTransaction";
import { DataContext, DataContextProps } from "@src/contexts/dataContext";


export default function TransAdd() {
    const navigate = useNavigate();
    const {reloadTransactions} = useContext(DataContext) as DataContextProps;

    const onSubmit = (transaction: PartialTransaction) => {
        createTransaction(
            transaction
        );
        reloadTransactions();
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