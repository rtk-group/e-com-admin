import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Orders from './pages/Orders.jsx'
import Login from './components/Login.jsx'
import { ToastContainer, toast } from 'react-toastify';
export const currency = "$"

export const backendurl = import.meta.env.VITE_BACKEND_URL

const App = () => {

    const [token, settoken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");

    useEffect(() => {
        localStorage.setItem('token', token)
    }, [token]);

    return (
        <div className="bg-gray-50 min-screen">
            <ToastContainer />
            {
                token === "" ? <Login settoken={settoken} /> :
                    <>
                        <Navbar settoken={settoken} />
                        <hr />
                        <div className="flex w-full">
                            <Sidebar />
                            <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
                                <Routes>
                                    <Route path='/add' element={<Add token={token} />} />
                                    <Route path='/list' element={<List token={token} />} />
                                    <Route path='/orders' element={<Orders token={token} />} />
                                </Routes>
                            </div>
                        </div>
                    </>
            }

        </div>
    )
}

export default App;

