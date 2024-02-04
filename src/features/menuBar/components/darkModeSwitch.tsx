import { useState } from "react";
import { IconButton } from "@mui/material";

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

export default function DarkModeSwitch() {
    const [dark, setDark] = useState(false);

    const handleDarkModeClick = () => {
        const newValue = !dark;
        const body = document.body;
        if (newValue) {
            body?.classList.add("dark");
        } else {
            body?.classList.remove("dark");
        }
        setDark(newValue);
    }

    return (
        <div className="flex gap-2 items-center">
            <label className="relative w-[60px] h-[30px]">
                <input 
                    type="checkbox"
                    className="peer opacity-0 w-0 h-0"
                    defaultChecked={dark}
                    onClick={handleDarkModeClick}
                />
                <span 
                    className={[
                        "absolute top-0 left-0 right-0 bottom-0 transition-all cursor-pointer bg-transparent rounded-full border-2",
                        "peer-checked:border-gray-400"
                    ].join(" ")}
                />
                <div 
                    className={[
                        "absolute h-[25px] w-[25px] left-[3px] bottom-[2.6px] cursor-pointer rounded-full text-amber-500 z-10 transition-all flex justify-center items-center text-sm",
                        "peer-checked:translate-x-[30px] peer-checked:text-gray-400"
                    ].join(" ")}
                >
                    {dark ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                </div>
            </label>
        </div>
    );
}