import MenuBar from "@src/features/menuBar";
import DataProvider from "@src/contexts/dataContext";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="w-full min-h-screen dark:bg-gray-800 dark:text-gray-300 dark:border-gray-300">
          <DataProvider>
            <MenuBar />
            <Outlet />
          </DataProvider>
        </div>
      );
}