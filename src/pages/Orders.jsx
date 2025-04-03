import React, { useState, useEffect } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets.js'
import { currency } from '../App.jsx'
import Customselect from "../components/Customselect.jsx";
import { backendurl } from "../App.jsx";

const Orders = ({ token }) => {

    const [orders, setorders] = useState([]);

    const fetchallorders = async () => {
        if (!token) {
            return null
        }
        try {
            const response = await axios.post(backendurl + '/api/order/list', {}, { headers: { token } })
            // console.log(response)
            if (response.data.success) {
                setorders(response.data.orders.reverse())
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const statushandler = async (e, orderid) => {
        try {
            const response = await axios.post(backendurl + '/api/order/status', { orderid, status: e.target.value }, { headers: { token } })
            if (response.data.success) {
                await fetchallorders()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchallorders()
    }, [token]);

    return (
        <div>
            <h3>Orders Page</h3>
            <div>
                {
                    orders.map((order, index) => (
                        <div className=" grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 " key={index}>
                            <img src={assets.parcel_icon} alt="" />
                            <div>
                                <div>
                                    {
                                        order.items.map((item, index) => {
                                            if (index === order.items.length - 1) {
                                                return <p className="py-0.5" key={index}>{item.name} X {item.quantity} <span>{item.size}</span></p>
                                            } else {
                                                return <p className="py-0.5" key={index}>{item.name} X {item.quantity} <span>{item.size}</span>,</p>
                                            }
                                        })
                                    }
                                </div>
                                <p className="mt-3 mb-2 font-medium">{order.address.firstname + " " + order.address.lastname}</p>
                                <div>
                                    <p>{order.address.street + ","}</p>
                                    <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
                                </div>
                                <p>{order.address.phone}</p>

                            </div>
                            <div>
                                <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
                                <p className="mt-3">Method: {order.paymentmethod}</p>
                                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>

                            {/* Usage: */}
                            <Customselect
                                value={order.status}
                                onChange={(e) => statushandler(e, order._id)}
                                options={[
                                    { value: "Order placed", label: "Order placed" },
                                    { value: "Packing", label: "Packing" },
                                    { value: "Shipped", label: "Shipped" },
                                    { value: "Out for delivery", label: "Out for delivery" },
                                    { value: "Delivered", label: "Delivered" }
                                    // ... other options
                                ]}
                            />

                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Orders