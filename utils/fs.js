const fs = require("fs");
const status = require("http-status");

class Fs {
  deleteFile = (res, path) => {
    try {
      fs.unlinkSync(path);
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: status[500],
        data: "Gagal Hapus File Img",
      });
    }
  };

  checkExistingFiles = (res, path) => {
    try {
      return fs.existsSync(path);
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: status[500],
        data: "Internal Error",
      });
    }
    return;
  };
}

module.exports = new Fs();
