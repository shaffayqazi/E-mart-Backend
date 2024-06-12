const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");
router.post("/create", brandController.createBrand);
// Get all brands
router.get("/fetch", brandController.getAllBrands);

// Get products by brand ID
router.get("/fetch/:id/products", brandController.getProductsByBrand);

module.exports = router;
