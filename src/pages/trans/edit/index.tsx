import { ActionFunctionArgs, LoaderFunctionArgs, ParamParseKey, Params, RouteObject, useLoaderData, useNavigate } from "react-router-dom";
import { getTransaction, updateTransaction } from "@src/utils/services/transactions";
import Transaction, { PartialTransaction } from "@src/interfaces/interfaceTransaction";
import TransForm from "@src/features/transForm";
import { useContext } from "react";
import { DataContext, DataContextProps } from "@src/contexts/dataContext";

interface TransEditProps extends LoaderFunctionArgs {
    params: {
        transId?: string
    };
}

interface TransEditLoaderData {
    transaction?: Transaction
}

export async function loader({ params }: TransEditProps ): Promise<TransEditLoaderData> {
    const transaction: Transaction | undefined = params?.transId ? getTransaction(params?.transId) : undefined;
    return { transaction };
}

export default function TransEdit() {
    const navigate = useNavigate();
    const { transaction } = useLoaderData() as TransEditLoaderData;
    const { reloadTransactions } = useContext(DataContext) as DataContextProps;
    
    const onSubmit = (partialTransaction: PartialTransaction) => {
        if (transaction) {
            updateTransaction(
                transaction.id,
                partialTransaction
            );
            reloadTransactions();
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
                initialValue={transaction}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </>
    )
}