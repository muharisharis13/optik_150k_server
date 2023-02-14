const crypto = require("crypto");

const hashPassword = (data) => {
  if (data) {
    return crypto.createHash("md5").update(data).digest("hex");
  }
  return;
};

module.exports = hashPassword;
