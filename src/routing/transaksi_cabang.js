const express = require("express");
const router = express.Router();
const {
  token: { isAuthentication },
} = require("../../utils");
const {
  addTransaksiCabang,
  getListTransaksiCabang,
  getDetailTransaksiCabang,
  deleteTransaksiCabang,
  updateTransaksiCabang,
  pelunasanTransaksiCabang,
  cancelTransaksiCabang,
} = require("../controller/transaksi_cabang");

router.post("/", addTransaksiCabang);
router.get("/", getListTransaksiCabang);
router.get("/:uuid", getDetailTransaksiCabang);
router.delete("/:uuid", deleteTransaksiCabang);
router.put("/:uuid", updateTransaksiCabang);
router.post("/pelunasan/:uuid", pelunasanTransaksiCabang);
router.post("/cancel/:uuid", cancelTransaksiCabang);

module.exports = router;
