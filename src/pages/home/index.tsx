import Trans from "../trans";
import PeopleView from "@src/features/peopleView";
import Invoice from "@src/features/invoice";
import { useContext, useEffect } from "react";
import { DataContext, DataContextProps } from "@src/contexts/dataContext";
import { useNavigate } from "react-router-dom";


export default function Home() {
    const {cleanPersons} = useContext(DataContext) as DataContextProps;

    useEffect(() => {
        cleanPersons();
    }, [])

    return (
        <>
            <div
                className="flex flex-col"
            >
                <PeopleView />
                <Trans />
                <Invoice />
            </div>
        </>
    )
}
