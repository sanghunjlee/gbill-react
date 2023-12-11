import React from "react";
import ToggleButton from "../buttons/toggleButton";
import { Link } from "react-router-dom";

export default function MenuBar() {
    const handleThemeClick = (toggled: boolean) => {
        const body = document.body;
        if (toggled) {
            body?.classList.remove("dark");
        } else {
            body?.classList.add("dark");
        }
    }

    return (
        <div
            className={[
                "w-inherit h-16 m-2 px-2 py-4 flex justify-start items-center border-b-2",
                "dark:border-gray-500"
            ].join(" ")}
        >
            <Link to={`/gbill-react`}>
                <div className="w-32 h-12 rounded-lg flex justify-center items-center bg-gray-500">
                    <div className="flex items-end gap-2 text-white">
                        <h1 className="font-bold">gBill</h1>
                    </div>
                </div>
            </Link>
            <span className="flex-auto" />
            <div className="flex items-center">
                <ToggleButton label="Theme:" toggled={true} onClick={handleThemeClick}/>
            </div>
        </div>
    )
}