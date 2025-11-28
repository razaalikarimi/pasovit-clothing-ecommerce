const router = require("express").Router();
const { protect } = require("../middleware/authMiddleware");
const { getCart, addToCart } = require("../controllers/cartController");

router.get("/", protect, getCart);
router.post("/add", addToCart);

module.exports = router;
