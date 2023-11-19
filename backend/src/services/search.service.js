import ProductModel from "../models/product.model.js";

const searchProducts = async(searchTerm) => {

      const filteringProductName = "productName";
  
      const allProducts = await ProductModel.find({}).exec();
  
      const matchingProducts = allProducts.filter((p) =>
        p[filteringProductName].toLowerCase().includes(searchTerm.toLowerCase())
      );


      return matchingProducts
  
}

export {searchProducts}