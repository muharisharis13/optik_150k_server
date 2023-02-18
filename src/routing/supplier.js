const express = require("express");
const router = express.Router();
const {
  addSupplier,
  getListSupplier,
  getDetailSupplier,
  deleteSupplier,
  updateSupplier,
} = require("../controller/supplier");

router.get("/", getListSupplier);
router.get("/:uuid", getDetailSupplier);
router.post("/", addSupplier);
router.delete("/:uuid", deleteSupplier);
router.put("/:uuid", updateSupplier);

module.exports = router;
