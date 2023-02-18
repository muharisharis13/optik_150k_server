const express = require("express");
const router = express.Router();
const {
  token: { isAuthentication },
} = require("../../utils");
const {
 addTransaksiCabangDetail,
 getListTransaksiCabangDetail,
 getDetailTransaksiCabangDetail,
 deleteTransaksiCabangDetail,
 updateTransaksiCabangDetail
} = require("../controller/transaksi_cabang_detail");


router.post("/",addTransaksiCabangDetail);
router.get("/", getListTransaksiCabangDetail);
router.get("/:uuid",getDetailTransaksiCabangDetail)
router.delete("/:uuid",deleteTransaksiCabangDetail)
router.put("/:uuid",updateTransaksiCabangDetail)

module.exports = router;
