import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import TransForm from "@src/features/transactions/components/transForm";
import { useContext } from "react";
import { DataContext, DataContextProps } from "@src/contexts/dataContext";

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

export default function TransDetail() {
    const navigate = useNavigate();
    const { id } = useLoaderData() as TransEditLoaderData;
    const {transactions} = useContext(DataContext) as DataContextProps;

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <TransForm 
                title="Transaction Detail"
                initialValue={transactions.find(t => t.id === id)}
                readonly
                onCancel={onCancel}
            />
        </>
    )
}