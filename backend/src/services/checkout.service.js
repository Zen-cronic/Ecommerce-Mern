import UserModel from "../models/user.model";


const checkOut = async ({productsArr, totalAmount}, user) => {

    let currentOrder = {};
    const currentItems = [];
  
  
    productsArr.map((p) => {
      //p.orderItems
      const [[productID, count]] = Object.entries(p);
      currentItems.push({ productID, count }); //an arr of obj with count and id props
    });
  
    //or orderDate: new Date.now()
    currentOrder = {
      orderDate: new Date(Date.now()),
      orderItems: currentItems,
      orderTotal: totalAmount,
    };
  
    user.orders.push(currentOrder);
  
 
   
    await user.save();

    return currentOrder
}

export {checkOut}