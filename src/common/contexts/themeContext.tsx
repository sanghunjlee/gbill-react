import { createTheme, PaletteColor, ThemeProvider } from "@mui/material/styles";
import { blueGrey, grey, orange } from "@mui/material/colors";
import { ComponentProps, Context, createContext, useMemo, useState } from "react";

declare module "@mui/material/styles" {
    interface Palette {
        orangeTheme: string
    }
    interface PaletteOptions {
        orangeTheme: PaletteColor
    }
}

declare module "@mui/material/ToggleButton" {
    interface ToggleButtonPropsColorOverrides {
        orangeTheme: true
    }
}

export interface ThemeContextProps {
    toggle: VoidFunction

}

export const ThemeContext: Context<ThemeContextProps|null> = createContext<ThemeContextProps|null>(null);

interface ThemeProviderProps extends Pick<ComponentProps<"div">, "children"> {}

export default function ThemeContextProvider({children}: ThemeProviderProps) {
    const [mode, setMode] = useState<'light'|'dark'>('light');

    const darkMode = useMemo(() => ({
        toggle: () => {
            const body = document.body;
            if (mode === 'light') {
                body?.classList.add("dark");
            } else {
                body?.classList.remove("dark");
            }    
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        }
    }), [mode]);

    const { palette } = createTheme();
    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            primary: blueGrey,
            secondary: grey,
            orangeTheme: palette.augmentColor({ color: orange })
        }
    }), [mode]);

    return (
        <ThemeContext.Provider 
            value={darkMode}
        >
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
