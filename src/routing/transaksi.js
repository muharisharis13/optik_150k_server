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
 updateTransaksi
} = require("../controller/transaksi");


router.post("/",addTransaksi);
router.get("/", getListTransaksi);
router.get("/:uuid",getDetailTransaksi)
router.delete("/:uuid",deleteTransaksi)
router.put("/:uuid",updateTransaksi)

module.exports = router;
