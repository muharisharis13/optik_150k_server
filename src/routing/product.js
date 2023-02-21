const express = require("express");
const router = express.Router();
const {
  token: { isAuthentication },
} = require("../../utils");
const {
  addProduct,
  getListProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
  getListFreeProduct,
} = require("../controller/product");

router.post("/", addProduct);
router.get("/", getListProduct);
router.get("/free", getListFreeProduct);
router.get("/:uuid", getDetailProduct);
router.delete("/:uuid", deleteProduct);
router.put("/:uuid", updateProduct);

module.exports = router;
