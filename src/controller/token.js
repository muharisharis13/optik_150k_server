const httpStatus = require("http-status");
const {
  token: { verifyRefreshToken, createRefreshToken, createToken },
} = require("../../utils");
const ModelAdmin = require("../models/admin");
const ModelToken = require("../models/token");

class ControllerToken {
  refreshToken = async (req, res) => {
    const { refreshToken: refreshTokenBody, username } = req.body;

    try {
      const isValid = verifyRefreshToken(username, refreshTokenBody);
      if (!isValid) {
        return res
          .status(401)
          .json({
            code: 401,
            message: httpStatus[401],
            data: "Invalid token,try login again",
          });
      }

      // check token
      await ModelToken.findOne({
        refresh_token: refreshTokenBody,
      }).then(async (resultToken) => {
        if (resultToken) {
          // check admin data =====
          const getAdmin = await ModelAdmin.findOne({
            where: {
              username,
              id: resultToken.dataValues.id_user,
            },
          });

          if (getAdmin) {
            const token = createToken(getAdmin.dataValues);
            const refreshToken = createRefreshToken(getAdmin.dataValues);
            await resultToken.update({
              token: token,
              refresh_token: refreshToken,
            });

            res.status(200).json({
              code: 200,
              message: httpStatus[200],
              data: {
                type: "Bearer",
                token,
                refreshToken,
              },
            });
          }
        }
      });
    } catch (error) {
      res
        .status(401)
        .json({ code: 401, message: httpStatus[401], data: error });
    }
  };
}

module.exports = new ControllerToken();
