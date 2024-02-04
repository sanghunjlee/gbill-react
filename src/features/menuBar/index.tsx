import { useState } from "react";
import ToggleButton from "../../components/buttons/toggleButton";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";

import DarkModeSwitch from "./components/darkModeSwitch";

export default function MenuBar() {

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
                <DarkModeSwitch />
            </div>
        </div>
    )
}