const express = require("express");
const router = express.Router();
const {
  addBeli,
  getListBeli,
  getDetailBeli,
  deleteBeli,
  updateBeli,
} = require("../controller/beli");

router.get("/", getListBeli);
router.get("/:uuid", getDetailBeli);
router.post("/", addBeli);
router.delete("/:uuid", deleteBeli);
router.put("/:uuid", updateBeli);

module.exports = router;
