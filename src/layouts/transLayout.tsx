import { Outlet } from "react-router-dom";

export default function TransLayout() {
    return (
        <div className="w-[800px] mx-auto my-8">
            <Outlet />
        </div>
      );
}