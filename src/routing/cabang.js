const express = require("express");
const router = express.Router();
const {
  token: { isAuthentication },
} = require("../../utils");
const {
  addCabang,
  getListCabang,
  getDetailCabang,
  deleteCabang,
  updateCabang
} = require("../controller/cabang");

router.get("/", getListCabang);
router.post("/", addCabang);
router.get("/:uuid", getDetailCabang);
router.delete("/:uuid", deleteCabang);
router.put("/:uuid", updateCabang);


module.exports = router;
