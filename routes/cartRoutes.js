// routes/cartRoutes.js

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { protect } = require("../middlewares/authMiddleware");

// Add item to cart
router.post("/create", protect, cartController.addToCart);

// Remove item from cart
router.delete("/remove/:itemId", protect, cartController.removeFromCart);

// Get user's cart
router.get("/fetch", protect, cartController.getUserCart);

module.exports = router;
