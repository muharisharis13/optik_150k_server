const express = require("express");
const router = express.Router();
const {
  token: { isAuthentication },
} = require("../../utils");
const {
  addCategory,
  getListCategory,
  getDetailCategory,
  deleteCategory,
  updateCategory,
} = require("../controller/category");

router.get("/", getListCategory);
router.get("/:uuid", getDetailCategory);
router.post("/", addCategory);
router.delete("/:uuid", deleteCategory);
router.put("/:uuid", updateCategory);

module.exports = router;
