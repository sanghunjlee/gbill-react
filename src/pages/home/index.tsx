import PeopleView from "../../components/peopleView";
import Trans from "../trans";


export default function Home() {
    return (
        <div
            className="flex flex-col"
        >
            <PeopleView />
            <Trans />
        </div>
    )
}
