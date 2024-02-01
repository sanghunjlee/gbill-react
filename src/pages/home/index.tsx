import Trans from "../trans";
import PeopleView from "@src/features/peopleView";
import Invoice from "@src/features/invoice";


export default function Home() {
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
