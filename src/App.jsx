import React, { useState } from 'react'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import Login from './components/Login.jsx'


const App = () =>{

    const [token, settoken] = useState('');




    return(
        <div className="bg-gray-50 min-screen">
            {
                token === ""? <Login/>:
                <>
          <Navbar/> 
           <hr/>
           <div className="flex w-full">
            <Sidebar/>
            <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
                <Routes>
                    <Route path='/add' element={<Add/>}/>
                    <Route path='/list' element={<List/>}/>
                    <Route path='/orders' element={<Orders/>}/>
                </Routes>
            </div>
           </div>
        </>
            }
          
        </div>
    )
}

export default App;

