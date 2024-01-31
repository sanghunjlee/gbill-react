import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { createTransaction } from "@src/data/transactions";
import TransForm from "@src/components/transForm";
import { PartialTransaction } from "@src/interfaces/interfaceTransaction";
import { DataContext } from "@src/contexts/pageContext";


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