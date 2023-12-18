import { ActionFunctionArgs, LoaderFunctionArgs, ParamParseKey, Params, RouteObject, useLoaderData } from "react-router-dom";
import { getTransaction } from "../../../data/transactions";
import Transaction from "../../../interfaces/interfaceTransaction";
import TransForm from "../../../components/transForm";

const PathNames = {
    transId: '/trans/:transId',
} as const;

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
    const { transaction } = useLoaderData() as TransEditLoaderData;

    return (
        <>
            <TransForm 
                initialValue={transaction}

            />
        </>
    )
}