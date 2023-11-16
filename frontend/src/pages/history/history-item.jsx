
import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";



export const HistoryItem = (props) => {

    const {allProducts} = useContext(ShopContext)

//   const {  productID, count } = props.data;

 const orderObj = props.data

//  const formattedDate = orderObj.orderDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})


//   return (
//    <>
//     <div className="cartItem">

//     {/* innerArrObj is not a fx cuz it's chagned to an obj */}
//     {innerArrObj.map((prodObj, idx)=> {

// //must chk whether find() returns undefined or not, canNOT assume even if it's defninte to have a value
//         const productInfo = allProducts.find(product => (product._id===prodObj.productID))

//         if(productInfo){
//             return (  <div className="description" key={idx}> 
//         <li key={prodObj.productID}>{productInfo.productName} {productInfo.price} | Amt: {prodObj.count}
        
//             <div></div>
            
//             </li>

        
//         {/* <span>Another purhcase</span> */}
//         </div>)

//         }
        
//     })}

//     {/* <span>Another purhcase</span> */}
// </div>
//    </>
//   );


return (

    <div className="cartItem">
        {orderObj.orderItems.map((item,idx)=>{

            const productInfo = allProducts.find(product => (product._id===item.productID))
             if(productInfo){
                  return (  <div className="description" key={idx}> 
                                    <li key={item.productID}> 
                            {productInfo.productName} {productInfo.price} | Amt: {item.count}
                                     </li>

                          </div>
        )}
        
    })}

    <span className="description">
  
    Date: {orderObj.orderDate.split(".")[0]}
    {/* Date: {orderObj.orderDate.toDateString()} */}
    {/* Date: {formattedDate} */}
    <br></br>
    Ttl: {orderObj.orderTotal}</span>
    </div>
)
};

