import React from 'react';

import MenuBar from '../components/menuBar';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div className="h-screen p-4 flex justify-center dark:bg-gray-800">
            <div className="w-screen lg:w-[80%]">
                <MenuBar />
                <Outlet />
            </div>
        </div>
  );
}

export default App;
