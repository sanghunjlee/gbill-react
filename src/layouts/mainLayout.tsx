import MenuBar from "@src/features/menuBar";
import DataProvider from "@src/contexts/dataContext";
import { Outlet } from "react-router-dom";
import ThemeContextProvider from "@src/contexts/themeContext";


export default function MainLayout() {
    return (
        <div className="relative w-full min-h-screen dark:bg-gray-800 dark:text-gray-300 dark:border-gray-300">
          <DataProvider>
            <ThemeContextProvider>
              <MenuBar />
              <div className="py-[120px]">
                <Outlet />
              </div>
            </ThemeContextProvider>
          </DataProvider>
        </div>
      );
}