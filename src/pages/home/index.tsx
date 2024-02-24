import Dashboard from "@src/features/invoice/components/dashboard";
import { useContext } from "react";
import { DataContext, DataContextProps } from "@src/contexts/dataContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TransItem from "@src/features/transactions/components/transItem";


export default function HomePage() {
    const navigate = useNavigate();
    const {transactions, deleteAllTransactions} = useContext(DataContext) as DataContextProps;

    const handleAddTransaction = () => {
        navigate("trans/add");
    }

    const handleClearTransactions = () => {
        deleteAllTransactions();
    }

    return (
        <div className="w-[90%] lg:w-[800px] mx-auto py-8">
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
                            <div className="w-full max-h-[800px] py-4 space-y-2 overflow-y-auto">
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
                <Dashboard />
            </div>
        </div>
    )
}
