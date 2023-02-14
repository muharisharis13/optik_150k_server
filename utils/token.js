const jwt = require("jsonwebtoken")
const httpStatus = require("http-status")
const ModelAdmin = require("../src/models/admin")
const ModelToken = require("../src/models/token")

const tokenLife = "1m"
const refreshTokenLife = "1d"
const secretToken = "mesProjectToken"
const secretRefreshToken = "mesProjectRefreshToken"

const createToken = (data) => jwt.sign(data, secretToken)
const createRefreshToken = (data) => jwt.sign(data, secretRefreshToken)


const verifyRefreshToken = (username, token) => {
  try {

    const decoded = jwt.verify(token, secretRefreshToken);
    return decoded.username === username;
  } catch (error) {
    return false;
  }
}


const isAuthentication = async (req, res, next) => {

  try {
    const type = req.headers.authorization.split(" ")[0]
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretToken);
    const { username, name, id } = decoded

    if (type !== "Bearer") {
      res.status(401).json({
        code: 401,
        message: httpStatus[401],
        data: "Type authorization not found !"
      })
    }
    else {

      const getToken = await ModelToken.findOne({
        where: {
          uuid_admin: id
        }
      })

      if (getToken.dataValues) {
        await ModelAdmin.findOne({
          where: {
            username, name
          }
        })
          .then(result => {
            if (result) {
              next()
            }
            else {
              res.status(401).json({
                code: 401,
                message: httpStatus[401]
              })
            }
          })

      }

    }



  } catch (error) {
    res.status(401).json({
      code: 401,
      message: httpStatus[401],
      data: error
    })
  }
}



module.exports = {
  createToken,
  createRefreshToken,
  isAuthentication,
  verifyRefreshToken
}