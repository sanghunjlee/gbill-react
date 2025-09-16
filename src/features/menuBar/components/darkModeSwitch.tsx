import { useContext } from "react";
import { useTheme } from '@mui/material/styles';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { ThemeContext, ThemeContextProps } from "@common/contexts/themeContext";
import ToggleButton from "@mui/material/ToggleButton";

export default function DarkModeSwitch() {
    const {toggle} = useContext(ThemeContext) as ThemeContextProps;
    const theme = useTheme();

    const handleDarkModeClick = () => {
        toggle();
    }

    return (
        <ToggleButton
            value="dark"
            size="small"
            color={theme.palette.mode === 'light' ? 'orangeTheme' : 'secondary'}
            selected={theme.palette.mode === 'light'}
            onChange={handleDarkModeClick}
            sx={{
                borderRadius: "1rem"
            }}
        >
            {theme.palette.mode === 'light' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </ToggleButton>
    );
}