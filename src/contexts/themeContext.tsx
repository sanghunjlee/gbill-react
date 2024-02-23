import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey, grey } from "@mui/material/colors";
import { ComponentProps, Context, createContext, useMemo, useState } from "react";

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

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            primary: blueGrey,
            secondary: grey,
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
