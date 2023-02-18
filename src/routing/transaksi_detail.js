const express = require("express");
const router = express.Router();
const {
  token: { isAuthentication },
} = require("../../utils");
const {
 addTransaksiDetail,
 getListTransaksiDetail,
 getDetailTransaksiDetail,
 deleteTransaksiDetail,
 updateTransaksiDetail
} = require("../controller/transaksi_detail");


router.post("/",addTransaksiDetail);
router.get("/", getListTransaksiDetail);
router.get("/:uuid",getDetailTransaksiDetail)
router.delete("/:uuid",deleteTransaksiDetail)
router.put("/:uuid",updateTransaksiDetail)

module.exports = router;
