import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { PartialTransaction } from "@common/interfaces/interfaceTransaction";
import TransForm from "@src/features/transactions/components/transForm";
import { useContext } from "react";
import { DataContext, DataContextProps } from "@common/contexts/dataContext";

interface TransEditProps extends LoaderFunctionArgs {
    params: {
        transId?: string
    };
}

interface TransEditLoaderData {
    id?: string
}

export async function loader({ params }: TransEditProps ): Promise<TransEditLoaderData> {
    return { id: params?.transId };
}

export default function TransEdit() {
    const navigate = useNavigate();
    const { id } = useLoaderData() as TransEditLoaderData;
    const {transactions, updateTransaction} = useContext(DataContext) as DataContextProps;
    
    const onSubmit = (partialTransaction: PartialTransaction) => {
        if (id) {
            updateTransaction(
                id,
                partialTransaction
            );
            navigate(-1);
        }
    };

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <TransForm 
                title="Edit Transaction"
                initialValue={transactions.find(t => t.id === id)}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </>
    )
}