const express = require("express");
const router = express.Router();
const {
  token: { isAuthentication },
} = require("../../utils");
const {
  addTransaksi,
  getListTransaksi,
  getDetailTransaksi,
  deleteTransaksi,
  updateTransaksi,
  pelunasanTransaksi,
  cancelTransaksi,
} = require("../controller/transaksi");

router.post("/pelunasan/:uuid", pelunasanTransaksi);
router.post("/cancel/:uuid", cancelTransaksi);
router.post("/", addTransaksi);
router.get("/", getListTransaksi);
router.get("/:uuid", getDetailTransaksi);
router.delete("/:uuid", deleteTransaksi);
router.put("/:uuid", updateTransaksi);

module.exports = router;
