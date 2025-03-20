import React, {useState, useEffect} from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import {assets} from '../assets/assets.js'

const Orders = ({token}) => {

    const [orders, setorders] = useState([]);

    const fetchallorders = async ()=>{
        if (!token) {
            return null
        }

        try {
            const response = await axios.post('http://localhost:4000' + '/api/order/list', {}, {headers:{token}})
            // console.log(response)
            if (response.data.success) {
                setorders(response.data.orders)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) { 
           toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchallorders()
    },[token]);

    return(
        <div>
            <h3>Orders Page</h3>
            <div>
                {
                    orders.map((order,index)=>(
                        <div key={index}>
                            <img src={assets.parcel_icon} alt="" />
                            <div>
                                {
                                    order.items.map((item, index)=>{
                                        if (index === order.items.length-1) {
                                            return <p key={index}>{item.name} X {item.quantity} <span>{item.size}</span></p>
                                        }else{
                                            return <p key={index}>{item.name} X {item.quantity} <span>{item.size}</span>,</p>
                                        }
                                    })
                                }
                            </div>
                            <p>{order.address.firstname + " " + order.address.lastname}</p>
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}

export default Orders