import Trans from "../trans";
import PeopleView from "@src/features/peopleView";
import Invoice from "@src/features/invoice";
import { useContext, useEffect } from "react";
import { DataContext, DataContextProps } from "@src/contexts/dataContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TransItem from "@src/features/transactions/components/transItem";


export default function HomePage() {
    const navigate = useNavigate();
    const {transactions, deleteAllTransactions, cleanPersons} = useContext(DataContext) as DataContextProps;

    useEffect(() => {
        cleanPersons();
    }, [transactions])

    const handleAddTransaction = () => {
        navigate("trans/add");
    }

    const handleClearTransactions = () => {
        deleteAllTransactions();
    }

    return (
        <div className="w-[800px] mx-auto my-8">
            <div
                className="flex flex-col items-stretch"
            >
                <div className="">
                    <div className="w-full p-4 rounded border-2">
                        <div className="w-fit mx-auto flex flex-col items-stretch gap-2">
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleAddTransaction}
                            >
                                Add Transaction
                            </Button>
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={handleClearTransactions}
                            >
                                Clear All Transactions
                            </Button>
                        </div>
                    </div>
                    {
                        transactions && transactions.length > 0 ? (
                            <div className="w-full">
                                <TransItem 
                                    index={"#"}
                                    desc={"Description"}
                                    payerName={"Payer"}
                                    amount={"Amount"}
                                    isHeader
                                />
                                {
                                    transactions.map((trans, index) => (
                                        <TransItem
                                            key={index}
                                            {...trans}
                                        />
                                    ))
                                }
                            </div>
                        ) : null
                    }
                </div>
                <PeopleView />
                <Invoice />
            </div>
        </div>
    )
}
