import { useState } from "react";
import ToggleButton from "../../components/buttons/toggleButton";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";

import DarkModeSwitch from "./components/darkModeSwitch";
import LogoComponent from "./components/logoComponent";

export default function MenuBar() {

    return (
        <div
            className={[
                "static p-4 shadow-md",
                "dark:border-gray-500"
            ].join(" ")}
        >
            <div className="w-[80%] mx-auto flex justify-start items-center">
                <LogoComponent />   
                <span className="flex-auto" />
                <div className="flex items-center">
                    <DarkModeSwitch />
                </div>
            </div>
        </div>
    )
}