const express = require("express");
const router = express.Router();
const {
  token: { isAuthentication },
} = require("../../utils");
const {
  register,
  login,
  logout,
  getListAdmin,
  deleteAdmin,
  updateAdmin,
  getDetailAdmin,
} = require("../controller/admin");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", getListAdmin);
router.delete("/:uuid", deleteAdmin);
router.put("/:uuid", updateAdmin);
router.get("/:uuid", getDetailAdmin);

router.get("/", function (req, res) {
  res.status(200).json({
    message: "hello",
  });
});

module.exports = router;
