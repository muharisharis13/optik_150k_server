const {
  AdminModel: ModelAdmin,
  TokenModel: ModelToken,
} = require("../models");
const status = require("http-status");
const {
  hashPassword,
  filterObject,
  token: { createToken, createRefreshToken },
  uuid
} = require("../../utils");

class ControllerAdmin {
  logout = async (req, res) => {
    const { id_admin, refresh_token } = req.body;

    try {
      const getToken = await ModelToken.destroy({
        where: {
          uuid_admin: id_admin,
          refresh_token,
        },
        raw: true,
      });

      if (getToken === 1) {
        res.status(200).json({
          code: 200,
          message: status[200],
          data: "Success Revoke Token",
        });
      } else {
        res.status(400).json({
          code: 400,
          message: status[400],
          data: "Please check your Token",
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: status[500],
        data: error,
      });
    }
  };

  login = async (req, res) => {
    const { username, password } = req.body;
    try {
      await ModelAdmin.findOne({
        where: {
          username,
          password: hashPassword(password),
        },
        raw: true,
      }).then(async (result) => {
        if (result) {
          const token = createToken(result);
          const refreshToken = createRefreshToken(result);

          await ModelToken.findOne({
            where: {
              uuid_admin: result.id,
            },
          }).then(async (resultToken) => {
            if (resultToken) {
              await resultToken.update({
                token,
                refresh_token: refreshToken,
              });
            } else {
              await ModelToken.create({
                uuid_admin: result.id,
                token: token,
                refresh_token: refreshToken,
              });
            }
          });

          result = {
            ...result,
            token,
            refresh_token: refreshToken,
            type: "Bearer",
          };

          res.status(200).json({
            code: 200,
            message: status[200],
            data: filterObject(result, [
              "id",
              "username",
              "name",
              "role",
              "token",
              "refresh_token",
              "type",
              "createdAt",
              "updatedAt",
            ]),
          });
        } else {
          res.status(400).json({
            code: 400,
            message: status[400],
            data: "username or password wrong ! Please re-login",
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: status[500],
        data: error,
      });
    }
  };
  register = async (req, res) => {
    const { username, password, name, role } = req.body;

    try {
      await ModelAdmin.create({
        username,
        password: hashPassword(password),
        name,
        role,
        uuid: uuid
      }).then((result) => {
        res.status(200).json({
          code: 200,
          message: status[200],
          data: filterObject(result, [
            "username",
            "name",
            "role",
            "createdAt",
            "updatedAt",
          ]),
        });
      });
    } catch (error) {
      res.status(400).json({
        code: 400,
        data: error.errors?.map((item) => ({
          path: item.path,
          type: item.type,
          validatorKey: item.validatorKey,
        })),
        message: status[400],
      });
    }
  };
}

module.exports = new ControllerAdmin();
