import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

interface ToggleButtonProps {
    label: string,
    toggled: boolean,
    onClick: (t: boolean) => void
}

export default function ToggleButton(props: ToggleButtonProps) {
    const [isToggled, toggle] = useState(props.toggled);
    
    const handleClick = () => {
        toggle(!isToggled);
        props.onClick(!isToggled);
    }

    return (
        <div className="flex gap-2 items-center">
            <p className="font-medium dark:text-gray-100">{props.label}</p>
            <label className="relative w-[60px] h-[30px]">
                <input 
                    type="checkbox"
                    className="peer opacity-0 w-0 h-0"
                    defaultChecked={isToggled}
                    onClick={handleClick}
                />
                <div 
                    className={[
                        "absolute h-[25px] w-[25px] left-[3px] bottom-[2.6px] cursor-pointer rounded-full bg-white text-gray-500 z-10 transition-all flex justify-center items-center text-sm",
                        "peer-checked:translate-x-[30px] peer-checked:text-amber-500"
                    ].join(" ")}
                >
                    {isToggled ? <FaSun /> : <FaMoon />}
                </div>
                <span 
                    className={[
                        "absolute top-0 left-0 right-0 bottom-0 transition-all cursor-pointer bg-gray-500 rounded-full",
                        "peer-checked:bg-amber-500"
                    ].join(" ")}
                />
            </label>
        </div>
    )
}