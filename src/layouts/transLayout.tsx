import { Outlet } from "react-router-dom";

export default function TransLayout() {
    return (
        <div className="w-[90%] lg:w-[800px] mx-auto my-8">
            <Outlet />
        </div>
      );
}