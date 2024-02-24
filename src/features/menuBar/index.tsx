import DarkModeSwitch from "./components/darkModeSwitch";
import LogoComponent from "./components/logoComponent";

export default function MenuBar() {

    return (
        <div
            className={[
                "fixed top-0 left-0 right-0 h-fit bg-white/50 p-4 shadow-md backdrop-blur z-10",
                "dark:border-gray-500"
            ].join(" ")}
        >
            <div className="w-[80%] mx-auto flex justify-start items-center">
                <LogoComponent />   
                <span className="flex-auto" />
                <div className="flex items-center">
                    <DarkModeSwitch />
                </div>
            </div>
        </div>
    )
}