const { KwitansiModel } = require("../models");
const {
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerKwitansi {
  addKwitansi = async (req, res) => {
    const { amount, price, employee } = req.body;

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    if (month < 10) {
      month = "0" + month;
    }
    var year = dateObj.getUTCFullYear();

    const getCountKwitansi = await KwitansiModel.findAndCountAll({
      limit: 1,
      order: [["kwitansi_code", "DESC"]],
      where: {
        ["kwitansi_code"]: {
          [Op.like]: `%${"/" + month + "/" + year}%`,
        },
      },
    });
    const { count, rows } = getCountKwitansi;

    let countKwi = 0;
    if (count == 0) {
      countKwi++;
    } else {
      countKwi = parseInt(rows[0].kwitansi_code?.split("/")[1]) + 1;
    }
    countKwi = countKwi?.toString().padStart(5, "0");

    var kwitansi_code = "KWI/" + countKwi + "/" + month + "/" + year;
    try {
      await KwitansiModel.create({
        kwitansi_code,
        amount,
        price,
        employee,
        uuid: uuidv4(),
      }).then((result) => {
        responseJSON({ res, status: 200, data: result });
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getListKwitansi = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getProduct = await KwitansiModel.findAndCountAll({
        where: condition,
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      responseJSON({
        res,
        status: 200,
        data: getPagingData(getProduct, page, limit),
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getDetailKwitansi = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getDetailKwitansi = await KwitansiModel.findOne({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: getDetailKwitansi,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error.message });
    }
  };

  deleteKwitansi = async (req, res) => {
    const { uuid } = req.params;
    try {
      const hapusKwitansi = await KwitansiModel.destroy({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: hapusKwitansi,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateKwitansi = async (req, res) => {
    const { uuid } = req.params;
    const { amount, price, employee } = req.body;
    try {
      const getDetailKwitansi = await KwitansiModel.findOne({
        where: {
          uuid,
        },
      });

      const updateKwitansi = await getDetailKwitansi.update({
        amount,
        price,
        employee,
      });

      responseJSON({ res, status: 200, data: updateKwitansi });
    } catch (error) {
      responseJSON({ res, status: 500, data: result });
    }
  };
}

module.exports = new ControllerKwitansi();
