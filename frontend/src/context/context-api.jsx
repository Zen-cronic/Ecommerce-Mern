import axios from "axios"

//nu more getNumOfProdcuts
export async function getProducts() {
    
    try {
        const response = await axios.get("http://localhost:5005/products")
        console.log(response.data.products)
        return response.data.products
   //setProducts
    
      } catch (error) {
        console.error(error)
      }
}