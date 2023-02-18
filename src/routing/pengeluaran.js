const express = require("express");
const router = express.Router();
const {
  addPengeluaran,
  getListPengeluaran,
  getDetailPengeluaran,
  deletePengeluaran,
  updatePengeluaran,
} = require("../controller/pengeluaran");

router.get("/", getListPengeluaran);
router.get("/:uuid", getDetailPengeluaran);
router.post("/", addPengeluaran);
router.delete("/:uuid", deletePengeluaran);
router.put("/:uuid", updatePengeluaran);

module.exports = router;
