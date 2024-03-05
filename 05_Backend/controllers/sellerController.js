// External dependencies

// Internal Imports
const Product = require("../models/Product");
const Order = require("../models/Order");
const {
  titleValidator,
  descriptionValidator,
  stockValidator,
  thumbnailUrlValidator,
  imagesValidator,
  priceValidator,
  discountPriceValidator,
  categoryValidator,
  sellerValidator,
} = require("../dependencies/validators/Product");

/** Controller for creating product */
async function createProduct(req, res) {
  const {
    title,
    description,
    stock,
    thumbnailUrl,
    images,
    category,
    price,
    discountPrice,
  } = req.body;

  // Validate the input
  if (
    !titleValidator(title) ||
    !descriptionValidator(description) ||
    !stockValidator(stock) ||
    !thumbnailUrlValidator(thumbnailUrl) ||
    !imagesValidator(images) ||
    !priceValidator(price) ||
    !discountPriceValidator(discountPrice, price) ||
    !categoryValidator(category) ||
    !sellerValidator(req.user.id)
  ) {
    return res.status(400).json({ message: "Invalid input" });
  }

  // Create the product
  const product = new Product({
    title,
    description,
    stock,
    thumbnailUrl,
    images,
    category,
    price,
    discountPrice,
    seller_id: req.user.id,
  });

  try {
    const savedProduct = await product.save();
    res.json({ product: savedProduct });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/** Controller for updating product */

async function updateProduct(req, res) {
  const {
    title,
    description,
    stock,
    thumbnailUrl,
    images,
    category,
    price,
    discountPrice,
  } = req.body;

  // Validate the input
  if (
    !titleValidator(title) ||
    !descriptionValidator(description) ||
    !stockValidator(stock) ||
    !thumbnailUrlValidator(thumbnailUrl) ||
    !imagesValidator(images) ||
    !priceValidator(price) ||
    !discountPriceValidator(discountPrice, price) ||
    !categoryValidator(category) ||
    !sellerValidator(req.user.id)
  ) {
    return res.status(400).json({ message: "Invalid input" });
  }

  // Update the product
  try {
    // Check if the product exists
    const product = await Product.findById(req.body.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user is the seller of the product
    if (product.seller_id !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(req.body.id, {
      title,
      description,
      stock,
      thumbnailUrl,
      images,
      category,
      price,
      discountPrice,
    });

    res.json({ product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/** Controller for deleting product */
async function deleteProduct(req, res) {
  try {
    // Check if the product exists
    const product = await Product.findById(req.body.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user is the seller of the product
    if (product.seller_id !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Delete the product
    await Product.findByIdAndDelete(req.body.id);

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/** Controller for getting seller dashboard */
// Body contains params start_date and end_date
// Returns the order details of the seller between the given dates
async function getDashboard(req, res) {
  // Validate the input
  if (
    !req.body.start_date ||
    !req.body.end_date ||
    typeof req.body.start_date !== "string" ||
    typeof req.body.end_date !== "string"
  ) {
    return res.status(400).json({ message: "Invalid input" });
  }

  // Get start and end dates and convert them to date objects
  const startDate = new Date(req.body.start_date);
  const endDate = new Date(req.body.end_date);

  try {
    // Get the order details
    const orderDetails = await Order.find({
      seller_id: req.user.id,
      timePlaced: { $gte: startDate, $lt: endDate },
    });

    // Assuming this data will be massaged on the frontend
    res.status(200).json({ orderDetails });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getDashboard,
};
