const { PengeluaranModel } = require("../models");
const {
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerPengeluaran {
  addPengeluaran = async (req, res) => {
    const { amount, price, employee } = req.body;

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    if (month < 10) {
      month = "0" + month;
    }
    var year = dateObj.getUTCFullYear();

    const getCountPengeluaran = await PengeluaranModel.findAndCountAll({
      limit: 1,
      order: [["kwitansi_code", "DESC"]],
      where: {
        ["kwitansi_code"]: {
          [Op.like]: `%${"/" + month + "/" + year}%`,
        },
      },
    });
    const { count, rows } = getCountPengeluaran;

    let countKwi = 0;
    if (count == 0) {
      countKwi++;
    } else {
      countKwi = parseInt(rows[0].kwitansi_code?.split("/")[1]) + 1;
    }
    countKwi = countKwi?.toString().padStart(5, "0");

    var kwitansi_code = "KWI/" + countKwi + "/" + month + "/" + year;
    try {
      await PengeluaranModel.create({
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

  getListPengeluaran = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getPengeluaran = await PengeluaranModel.findAndCountAll({
        where: condition,
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      responseJSON({
        res,
        status: 200,
        data: getPagingData(getPengeluaran, page, limit),
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getDetailPengeluaran = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getDetailPengeluaran = await PengeluaranModel.findOne({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: getDetailPengeluaran,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deletePengeluaran = async (req, res) => {
    const { uuid } = req.params;
    try {
      const hapusPengeluaran = await PengeluaranModel.destroy({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: hapusPengeluaran,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updatePengeluaran = async (req, res) => {
    const { uuid } = req.params;
    const { amount, price, employee } = req.body;
    try {
      const getDetailPengeluaran = await PengeluaranModel.findOne({
        where: {
          uuid,
        },
      });

      const updatePengeluaran = await getDetailPengeluaran.update({
        amount,
        price,
        employee,
      });

      responseJSON({ res, status: 200, data: updatePengeluaran });
    } catch (error) {
      responseJSON({ res, status: 500, data: result });
    }
  };
}

module.exports = new ControllerPengeluaran();
