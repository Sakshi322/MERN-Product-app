const Product = require("../models/Product");
const User = require("../models/User");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET PRODUCTS (Search + Pagination)
exports.getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const search = req.query.search || "";

  const query = {
    title: { $regex: search, $options: "i" },
  };



 const user = req.user ? await User.findById(req.user.id) : null;

const rawProducts = await Product.find(query)
  .skip((page - 1) * limit)
  .limit(limit);

const products = rawProducts.map((p) => ({
  ...p.toObject(),
  isFavorite: user ? user.favorites.includes(p._id) : false,
}));

  const total = await Product.countDocuments(query);

  res.json({
    products,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
};

// GET SINGLE PRODUCT
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  let isFavorite = false;

  if (req.user) {
    const user = await User.findById(req.user.id);
    isFavorite = user.favorites.includes(product._id);
  }

  res.json({ ...product.toObject(), isFavorite });
};

// UPDATE
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

// DELETE
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Product deleted" });
};

// ADD FAVORITE
exports.addFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);
  const productId = req.params.id;   // ✅ FIXED

  if (!user.favorites.includes(productId)) {
    user.favorites.push(productId);
    await user.save();
  }

  res.json({ msg: "Added to favorites" });
};
// REMOVE FAVORITE
exports.removeFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);
  const productId = req.params.id;   // ✅ FIXED

  user.favorites = user.favorites.filter(
    (fav) => fav.toString() !== productId
  );

  await user.save();

  res.json({ msg: "Removed from favorites" });
};