const express = require("express");
const router = express.Router();
const {
  addBeliDetail,
  getListBeliDetail,
  getDetailBeliDetail,
  deleteBeliDetail,
  updateBeliDetail,
} = require("../controller/beli_detail");

router.get("/", getListBeliDetail);
router.get("/:uuid", getDetailBeliDetail);
router.post("/", addBeliDetail);
router.delete("/:uuid", deleteBeliDetail);
router.put("/:uuid", updateBeliDetail);

module.exports = router;
