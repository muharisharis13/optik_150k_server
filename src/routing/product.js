const express = require("express");
const router = express.Router();
const {
  token: { isAuthentication },
  multer: { multerImage },
} = require("../../utils");
const {
  addProduct,
  getListProduct,
  getDetailProduct,
  deleteProduct,
  updateProduct,
  getListFreeProduct,
  uploadCSVProduct,
  exportCSVProduct,
} = require("../controller/product");

router.get("/export/csv", exportCSVProduct);
router.post("/upload/csv", multerImage.single("csv_file"), uploadCSVProduct);
router.post("/", addProduct);
router.get("/", getListProduct);
router.get("/free", getListFreeProduct);
router.get("/:uuid", getDetailProduct);
router.delete("/:uuid", deleteProduct);
router.put("/:uuid", updateProduct);

module.exports = router;
