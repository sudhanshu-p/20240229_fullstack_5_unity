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


/**
 * @swagger
 * /seller/createProduct:
 *   post:
 *     summary: Create new product.
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *         schemas:
  *         Product:
  *           type: object
  *           properties:
  *             title:
  *               type: string
  *             description:
  *               type: string
  *             trending:
  *               type: boolean
  *             stock:
  *               type: number
  *             thumbnailUrl:
  *               type: string
  *             images:
  *               type: array
  *               items:
  *                 type: string
  *             seller_id:
  *               type: string
  *             category:
  *               type: string
  *             price:
  *               type: number
  *             discountPrice:
  *               type: number
  *             reviews:
  *               type: array
  *               items:
  *                 type: string
  *             ratings:
  *               type: number
 *     responses:
 *       '200':
 *         description: Product created successfully.
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 *     securityDefinitions:
 *       BearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */
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
  // if (
  //   !titleValidator(title) ||
  //   !descriptionValidator(description) ||
  //   !stockValidator(stock) ||
  //   !thumbnailUrlValidator(thumbnailUrl) ||
  //   !imagesValidator(images) ||
  //   !priceValidator(price) ||
  //   !discountPriceValidator(discountPrice, price) ||
  //   !categoryValidator(category) ||
  //   !sellerValidator(req.user._id)
  // ) {
  //   return res.status(400).json({ message: "Invalid input" });
  // }

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
   // seller_id: req.user._id,
  });

  try {
    // Save the product
    const savedProduct = await product.save();
    res.json({ product: savedProduct });
  } catch (err) {
    console.error(err);
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
    !sellerValidator(req.user._id)
  ) {
    return res.status(400).json({ message: "Invalid input" });
  }

  // Update the product
  try {
    // Check if the product exists
    let product = await Product.find({ _id: req.body.id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product = product[0];

    // Check if the user is the seller of the product
    if (!product.seller_id.equals(req.user._id)) {
      return res.status(401).json({ message: "Unauthorized for this product" });
    }

    // Update the product
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.body.id },
      {
        title,
        description,
        stock,
        thumbnailUrl,
        images,
        category,
        price,
        discountPrice,
      }
    );

    res.json({ product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/** Controller for deleting product */
async function deleteProduct(req, res) {
  try {
    // Check if the product exists
    let product = await Product.find({ _id: req.body.id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product = product[0];

    // Check if the user is the seller of the product
    if (!product.seller_id.equals(req.user._id)) {
      return res.status(401).json({ message: "Unauthorized for this product" });
    }

    // Delete the product
    await Product.findOneAndDelete({ _id: req.body.id });

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err)
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
      seller_id: req.user._id,
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
