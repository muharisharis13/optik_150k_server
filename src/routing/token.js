const express = require("express");
const router = express.Router();
const { refreshToken } = require("../controller/token")


router.post("/refresh_token", refreshToken)


module.exports = router;
