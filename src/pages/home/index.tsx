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
    const {transactions, cleanPersons} = useContext(DataContext) as DataContextProps;

    useEffect(() => {
        cleanPersons();
    }, [transactions])

    const handleAddTransaction = () => {
        navigate("trans/add");
    }

    return (
        <div className="w-[800px] mx-auto my-8">
            <div
                className="flex items-stretch flex-col"
            >
                <div className="flex flex-col items-center">
                    <Button
                        variant="contained"
                        onClick={handleAddTransaction}
                    >
                        Add Transaction
                    </Button>
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
