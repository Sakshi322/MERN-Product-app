const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const optionalAuth = require("../middleware/optionalAuth");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addFavorite,
  removeFavorite,
} = require("../controllers/productController");

// Public routes
router.get("/", optionalAuth, getProducts);

// ⭐ FAVORITE ROUTES MUST COME BEFORE /:id
router.post("/:id/favorite", auth, addFavorite);
router.delete("/:id/favorite", auth, removeFavorite);

// Single product route
router.get("/:id", getProduct);

// Protected CRUD
router.post("/", auth, createProduct);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

module.exports = router;