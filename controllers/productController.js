const Product = require("../models/Product");
const Brand = require("../models/Brand");
const Category = require("../models/Category");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      brand,
      price,
      discount,
      category,
      description,
      stockStatus,
      variations,
    } = req.body;

    // Find the brand by name
    const brandDoc = await Brand.findOne({ name: brand });
    if (!brandDoc) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Find the category by name
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newProduct = new Product({
      title,
      imageUrl,
      brand: brandDoc._id,
      price,
      discount,
      category: categoryDoc._id,
      description,
      stockStatus,
      variations,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("brand")
      .populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products by brand
exports.getProductsByBrand = async (req, res) => {
  try {
    const brandName = req.params.brandName;

    // Find the brand by name
    const brandDoc = await Brand.findOne({ name: brandName });
    if (!brandDoc) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Find products by brand ID
    const products = await Product.find({ brand: brandDoc._id })
      .populate("brand")
      .populate("category");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("brand")
      .populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { title, imageUrl, brand, price, discount, category, description, stockStatus, variations } = req.body;

    // Find the brand by name
    const brandDoc = await Brand.findOne({ name: brand });
    if (!brandDoc) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Find the category by name
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        imageUrl,
        brand: brandDoc._id,
        price,
        discount,
        category: categoryDoc._id,
        description,
        stockStatus,
        variations,
      },
      { new: true }
    )
      .populate("brand")
      .populate("category");

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get brands
exports.getBrands = (req, res) => {
  Product.find({}, "brand", (err, brands) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(brands);
  });
};



exports.addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id; // Assuming the user ID is available from authentication middleware

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newReview = {
      user: userId,
      rating,
      comment,
    };

    product.reviews.push(newReview);
    product.numberOfReviews = product.reviews.length;
    product.averageRating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added", review: newReview });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};