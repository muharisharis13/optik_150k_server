const httpStatus = require("http-status")


module.exports = ({
    res, data = {}, status = 200
}) => {
    return res.status(status).json({
        code: status,
        message: httpStatus[status],
        data: data
    })
}