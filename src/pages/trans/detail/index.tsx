import { ActionFunctionArgs, LoaderFunctionArgs, ParamParseKey, Params, RouteObject, useLoaderData, useNavigate } from "react-router-dom";
import { getTransaction, updateTransaction } from "@src/data/transactions";
import Transaction, { PartialTransaction } from "@src/interfaces/interfaceTransaction";
import TransForm from "@src/components/transForm";

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

export default function TransDetail() {
    const navigate = useNavigate();
    const { transaction } = useLoaderData() as TransEditLoaderData;

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <TransForm 
                title="Transaction Detail"
                initialValue={transaction}
                readonly
                onCancel={onCancel}
            />
        </>
    )
}