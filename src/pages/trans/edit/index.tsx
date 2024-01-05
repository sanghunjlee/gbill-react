import { ActionFunctionArgs, LoaderFunctionArgs, ParamParseKey, Params, RouteObject, useLoaderData, useNavigate } from "react-router-dom";
import { getTransaction, updateTransaction } from "../../../data/transactions";
import Transaction, { PartialTransaction } from "../../../interfaces/interfaceTransaction";
import TransForm from "../../../components/transForm";
import { useContext } from "react";
import { DataContext } from "../../../contexts/pageContext";

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
    const { updateTransactions } = useContext(DataContext);
    
    const onSubmit = (partialTransaction: PartialTransaction) => {
        if (transaction) {
            updateTransaction(
                transaction.id,
                partialTransaction
            );
            updateTransactions();
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