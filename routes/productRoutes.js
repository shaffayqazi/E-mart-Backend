// routes/productRoutes.js

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Create a new product
router.post("/create", productController.createProduct);

// Get all the products
router.get("/fetch", productController.getAllProducts);

// Get a single product by ID
router.get("/fetch/:id", productController.getProduct);

// Update a product by ID
router.put("/:id", productController.updateProduct);

// Delete a product by ID
router.delete("/delete/:id", productController.deleteProduct);


router.get("/brand/:brandName", productController.getProductsByBrand);

router.get("/review/:id", productController.addReview);

module.exports = router;
