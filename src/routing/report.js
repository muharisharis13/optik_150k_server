const express = require("express");
const router = express.Router();
const {
  token: { isAuthentication },
} = require("../../utils");
const {
  getListProductAll,
  getListProductByCategory,
  getListTransaksi,
  getListTransaksiNew,
  getListTransaksiDP,
  getListTransaksiCabang,
} = require("../controller/report");

router.get("/transaksi-cabang", getListTransaksiCabang);
router.get("/transaksi-dp", getListTransaksiDP);
router.get("/transaksi", getListTransaksi);
router.get("/product-all-category", getListProductAll);
router.post("/product-by-category", getListProductByCategory);

module.exports = router;
