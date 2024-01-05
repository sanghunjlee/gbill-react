import { ActionFunctionArgs, LoaderFunctionArgs, ParamParseKey, Params, RouteObject, useLoaderData, useNavigate } from "react-router-dom";
import { getTransaction, updateTransaction } from "../../../data/transactions";
import Transaction, { PartialTransaction } from "../../../interfaces/interfaceTransaction";
import TransForm from "../../../components/transForm";

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
    
    const onSubmit = (partialTransaction: PartialTransaction) => {
        if (transaction) {
            updateTransaction(
                transaction.id,
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
                initialValue={transaction}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </>
    )
}