import ProductModel from "../models/Products.js";

export const createProduct = async (productInfo) => {
    
  const { productName, price } = productInfo;

  try {
    const newProduct = await ProductModel.create({ productName, price });
    return newProduct;
  } catch (error) {
    throw new Error("failed to create new product");
  }
  
};
