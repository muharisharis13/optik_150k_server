const {
  TransaksiModel,
  CategoryModel,
  TransaksiDetailModel,
} = require("../models");
const status = require("http-status");
const {
  filterObject,
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op, Sequelize } = require("sequelize");

class ControllerTransaksi {
  addTransaksi = async (req, res) => {
    const {
      total_transaksi,
      uang1,
      uang2,
      total_uang,
      customerId,
      payment_method1,
      payment_method2,
      discount,
    } = req.body;

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var date = dateObj.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    var year = dateObj.getUTCFullYear();
    var transaksi_date = `${year}-${month}-${date}`;
    var date_ = `${date}${month}${year}`;

    try {
      const getCountTransaksi = await TransaksiModel.findAndCountAll({
        where: Sequelize.where(
          Sequelize.fn("date", Sequelize.col("createdAt")),
          "=",
          transaksi_date
        ), // Select createdAt as format date YYYY-MM-DD
        limit: 1,
        order: [["no_faktur", "DESC"]],
      });
      const { count, rows } = getCountTransaksi;
      let countTransaksi = count + 1;
      var transaksiNo = countTransaksi?.toString().padStart(6, "0");
      var no_faktur = date_ + transaksiNo;
      var transaksi_status = "COMPLETE";

      await TransaksiModel.create({
        no_faktur,
        total_transaksi,
        uang1,
        uang2,
        total_uang,
        customerId,
        payment_method1,
        payment_method2,
        transaksi_status,
        discount,
        uuid: uuidv4(),
      }).then((result) => {
        responseJSON({ res, status: 200, data: result });
      });
    } catch (error) {
      responseJSON({ res, status: 400, data: error });
    }
  };

  getListTransaksi = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getTransaksi = await TransaksiModel.findAndCountAll({
        where: condition,
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      responseJSON({
        res,
        status: 200,
        data: getPagingData(getTransaksi, page, limit),
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getDetailTransaksi = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getTransaksi = await TransaksiModel.findOne({
        where: {
          uuid: uuid,
        },
      });

      const getListTransaksiDetail = await TransaksiDetailModel.findAll({
        where: {
          transaksiId: getTransaksi?.id,
        },
      });
      responseJSON({
        res,
        status: 200,
        data: {
          data_info: getTransaksi,
          listProduct: getListTransaksiDetail,
        },
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteTransaksi = async (req, res) => {
    const { uuid } = req.params;

    try {
      const deleteTransaksi = await TransaksiModel.destroy({
        where: {
          uuid: uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: deleteTransaksi,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateTransaksi = async (req, res) => {
    const { uuid } = req.params;
    const {
      total_transaksi,
      uang1,
      uang2,
      total_uang,
      customerId,
      payment_method1,
      payment_method2,
      discount,
      transaksi_status,
    } = req.body;

    try {
      const getDetailTransaksi = await TransaksiModel.findOne({
        where: {
          uuid: uuid,
        },
      });

      transaksi_status = transaksi_status ?? "COMPLETE";

      const updateTransaksi = await getDetailTransaksi.update({
        total_transaksi,
        uang1,
        uang2,
        total_uang,
        customerId,
        payment_method1,
        payment_method2,
        discount,
        transaksi_status,
      });

      responseJSON({ res, status: 200, data: updateTransaksi });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
}

module.exports = new ControllerTransaksi();
