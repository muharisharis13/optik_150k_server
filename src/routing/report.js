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
  getListBeli,
  geListKwitansi,
  getListPengeluaran,
  getListresumeKeuangan,
} = require("../controller/report");

router.get("/resume-keuangan", getListresumeKeuangan);
router.get("/pengeluaran", getListPengeluaran);
router.get("/kwitansi", geListKwitansi);
router.get("/beli", getListBeli);
router.get("/transaksi-cabang", getListTransaksiCabang);
router.get("/transaksi-dp", getListTransaksiDP);
router.get("/transaksi", getListTransaksi);
router.get("/product-all-category", getListProductAll);
router.post("/product-by-category", getListProductByCategory);

module.exports = router;
