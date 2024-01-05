import React, { useState } from 'react';

import MenuBar from '../components/menuBar';
import { Outlet } from 'react-router-dom';
import { getPersons } from '../data/persons';
import Person from '../interfaces/interfacePerson';
import Transaction from '../interfaces/interfaceTransaction';
import { getTransactions } from '../data/transactions';
import { DataContext } from '../contexts/pageContext';


function App() {
  const [persons, setPersons] = useState<Person[]>(getPersons());
  const [transactions, setTransactions] = useState<Transaction[]>(getTransactions());

  return (
    <div className="h-screen overflow-y-auto p-4 flex justify-center dark:bg-gray-800">
        <div className="w-screen lg:w-[80%]">
            <MenuBar />
            <DataContext.Provider 
              value={{ persons, transactions, setPersons, setTransactions}}
            >
              <Outlet />
            </DataContext.Provider>
        </div>
    </div>
  );
}

export default App;
