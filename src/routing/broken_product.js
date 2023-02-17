const express = require("express");
const router = express.Router();
const {
 addBrokenProduct,
 getListBrokenProduct,
 getDetailBrokenProduct,
 deleteBrokenProduct,
 updateBrokenProduct
} = require("../controller/broken_product");


router.post("/",addBrokenProduct);
router.get("/", getListBrokenProduct);
router.get("/:uuid",getDetailBrokenProduct)
router.delete("/:uuid",deleteBrokenProduct)
router.put("/:uuid",updateBrokenProduct)

module.exports = router;
