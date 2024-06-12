// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Create a new category
router.post("/create", categoryController.createCategory);

// Get all categories
router.get("/fetch", categoryController.getAllCategories);

// Get a single category by ID
router.get("/fetch/:id", categoryController.getCategory);

// Update a category by ID
router.put("/:id", categoryController.updateCategory);

// Delete a category by ID
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
