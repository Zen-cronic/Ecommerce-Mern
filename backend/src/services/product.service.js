import ProductModel from "../models/product.model.js";

const createProduct = async (productInfo) => {
  const { productName, price } = productInfo;

  try {
    const newProduct = await ProductModel.create({ productName, price });
    return newProduct;
  } catch (error) {
    console.error(error);
    throw new Error("failed to create new product");
  }
};

const getAllProducts = async () => {
  try {
    const products = await ProductModel.find({});
    console.log(products);
    return products;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

const getOneProduct = async (productId) => {
  try {
    const product = await ProductModel.findById(productId).lean().exec();
    // console.log(product);
    return product;
  } catch (error) {

    // console.log("Error from getOneProduct: ", error);
    throw new Error(`Failed to fetch product with id: ${productId}`);
  }
};

const getProductsCount = async () => {
  try {
    const numOfProducts = await ProductModel.countDocuments({}).lean().exec();

    return numOfProducts;
  } catch (error) {
    console.log(error);

    throw new Error("Failed to fetch total products count");
  }
};
export { getAllProducts, createProduct, getOneProduct, getProductsCount };
