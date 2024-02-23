import { useContext } from "react";
import { useTheme } from '@mui/material/styles';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { ThemeContext, ThemeContextProps } from "@src/contexts/themeContext";

export default function DarkModeSwitch() {
    const {toggle} = useContext(ThemeContext) as ThemeContextProps;
    const theme = useTheme();

    const handleDarkModeClick = () => {
        toggle();
    }

    return (
        <div className="flex gap-2 items-center">
            <label className="relative w-[60px] h-[30px]">
                <input 
                    type="checkbox"
                    className="peer opacity-0 w-0 h-0"
                    defaultChecked={theme.palette.mode === 'light'}
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
                    {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                </div>
            </label>
        </div>
    );
}