import { searchProducts } from "../services/search.service.js";

const searchProductsHandler = async (req, res) => {
  // same as blw 2 lines
  const { q } = req.query;

  if (!q) {
    return res.status(401).json({ message: "cannot search cuz q is empty" });
  }

  const matchingProducts = await searchProducts(q);

  res.status(200)
  return res.json({
    searchTerm: q,
    matchingProducts,
  });
};

export { searchProductsHandler };
