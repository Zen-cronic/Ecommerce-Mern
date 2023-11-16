import axios from "axios";
import { ShopContext } from "../../context/shop-context";


import React, { useContext, useState, useEffect } from 'react'
import { useGetUserID } from "../../hooks/useGetUserID";

import "../cart/cart.css"
import { HistoryItem } from "./history-item";

// export default function History() {   // nu {} around HIstory in import in App.jsx
export const  History=() =>{

    const userID = useGetUserID()

    // const {allProducts} = useContext(ShopContext)
    const [orderHistory, setOrderHistory] = useState([]);
    

    useEffect(() => {
        async function fetchHistory () {
        
            const response = await axios.get(`http://localhost:5005/history/${userID}`)
            const orderHistoryArr = response.data.allOrders 
            setOrderHistory(orderHistoryArr)

        }
        fetchHistory()
      }, [orderHistory]);
     
    
  return (
    <div className="cart">

        <div>history of purchase</div>
        { orderHistory.map((order, idx)=> {

      

            return <HistoryItem data={order} key={idx} />
            })

        }
        
        
    </div>
  )
}


