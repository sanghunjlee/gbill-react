import MenuBar from "@src/features/menuBar";
import DataProvider from "@src/contexts/dataContext";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="h-screen overflow-y-auto p-4 flex justify-center dark:bg-gray-800 dark:text-gray-300 dark:border-gray-300">
            <div className="w-screen lg:w-[80%]">
                <MenuBar />
                <DataProvider>
                  <Outlet />
                </DataProvider>
            </div>
        </div>
      );
}