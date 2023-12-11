import React from "react";
import PeopleView from "../components/peopleView";
import MenuBar from "../components/menuBar";
import TransView from "../components/transView";

export default function Home() {
    return (
        <div
            className="flex flex-col"
        >
            <PeopleView />
            <TransView />
        </div>
    )
}
