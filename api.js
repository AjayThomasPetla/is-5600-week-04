const path = require("path");
const Products = require("./products");
const autoCatch = require("./lib/auto-catch");

function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
}

async function listProducts(req, res) {
  // Extract the limit and offset query parameters
  const { offset = 0, limit = 25, tag } = req.query;
  // Pass the limit and offset to the Products service
  res.json(
    await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag,
    })
  );
}

async function getProduct(req, res, next) {
  const { id } = req.params;

  const product = await Products.get(id);
  if (!product) {
    return next();
  }

  return res.json(product);
}

async function createProduct(req, res) {
  console.log("request body:", req.body);
  res.json(req.body);
}

// delete product method 👇
async function deleteProduct(req, res) {
  console.log(`Request to delete product with ID: ${req.params.id}`);
  res.status(202).json({ message: 'Product deleted successfully' });
}

// update product method 👇
async function editProduct(req, res) {
  console.log("Updated product data:", req.body);
  res.status(200).json({ message: 'Product updated successfully' });
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  deleteProduct,
  editProduct,
});
