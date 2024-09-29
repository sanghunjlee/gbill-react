import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import TransForm from "@src/features/transactions/components/transForm";
import { PartialTransaction } from "@common/interfaces/interfaceTransaction";
import { DataContext, DataContextProps } from "@common/contexts/dataContext";


export default function TransAdd() {
    const navigate = useNavigate();
    const {createTransaction} = useContext(DataContext) as DataContextProps;

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
                title="Add a New Transaction"
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </>
    )
}