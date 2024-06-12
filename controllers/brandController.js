const Brand = require("../models/Brand");
const Product = require("../models/Product");

exports.createBrand = async (req, res) => {
  try {
    const { name, category } = req.body;
    const newBrand = new Brand({
      name,
      category,
    });
    const savedBrand = await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch products by brand ID
exports.getProductsByBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const products = await Product.find({ brand: brandId }).populate(
      "category"
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
