import React from "react";
import PeopleView from "../components/peopleView";
import MenuBar from "../components/menuBar";
import TransView from "../components/transView";

export default function Home() {
    return (
        <div className="h-screen p-4 flex justify-center dark:bg-gray-800">
            <div className="w-screen lg:w-[80%]">
                <MenuBar />
                <div
                    className="flex flex-col"
                >
                    <PeopleView />
                    <TransView />
                </div>
            </div>
        </div>
    )
}
