const express = require("express");
const { register, login } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const { getUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/fetch", protect, getUser);
module.exports = router;
