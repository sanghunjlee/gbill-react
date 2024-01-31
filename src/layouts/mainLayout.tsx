import MenuBar from "@src/components/menuBar";
import { DataContext } from "@src/contexts/pageContext";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="h-screen overflow-y-auto p-4 flex justify-center dark:bg-gray-800">
            <div className="w-screen lg:w-[80%]">
                <MenuBar />
                <DataContext.Provider 
                  value={{ }}
                >
                  <Outlet />
                </DataContext.Provider>
            </div>
        </div>
      );
}