const express = require("express");
const router = express.Router();
const {} = require("../../utils");
const {
  addCustomer,
  getListCustomer,
  getDetailCustomer,
  deleteCustomer,
  updateCustomer,
} = require("../controller/customer");

router.get("/", getListCustomer);
router.get("/:uuid", getDetailCustomer);
router.post("/", addCustomer);
router.delete("/:uuid", deleteCustomer);
router.put("/:uuid", updateCustomer);

module.exports = router;
