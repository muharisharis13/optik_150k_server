const express = require("express");
const router = express.Router();
const {
  addKwitansi,
  getListKwitansi,
  getDetailKwitansi,
  deleteKwitansi,
  updateKwitansi,
} = require("../controller/kwitansi");

router.get("/", getListKwitansi);
router.get("/:uuid", getDetailKwitansi);
router.post("/", addKwitansi);
router.delete("/:uuid", deleteKwitansi);
router.put("/:uuid", updateKwitansi);

module.exports = router;
