const express = require("express");
const router = express.Router();
const {
  token: { isAuthentication },
} = require("../../utils");
const {
  register,
  login,
  logout,
} = require("../controller/admin");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/", function (req, res) {
  res.status(200).json({
    message: "hello",
  });
});

module.exports = router;
