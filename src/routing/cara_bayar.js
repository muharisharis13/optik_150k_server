const express = require("express");
const router = express.Router();
const {
  addCaraBayar,
  getListCaraBayar,
  getDetailCaraBayar,
  deleteCaraBayar,
  updateCaraBayar,
} = require("../controller/cara_bayar");

router.get("/", getListCaraBayar);
router.get("/:uuid", getDetailCaraBayar);
router.post("/", addCaraBayar);
router.delete("/:uuid", deleteCaraBayar);
router.put("/:uuid", updateCaraBayar);

module.exports = router;
