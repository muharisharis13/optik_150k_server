const {
  TransaksiCabangModel,
  CategoryModel,
  TransaksiCabangDetailModel,
} = require("../models");
const status = require("http-status");
const {
  filterObject,
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op, Sequelize } = require("sequelize");

class ControllerTransaksiCabang {
  addTransaksiCabang = async (req, res) => {
    const {
      total_transaksi_cabang,
      uang1,
      uang2,
      uang_total,
      cabangId,
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
      const getCountTransaksi = await TransaksiCabangModel.findAndCountAll({
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
      var transaksi_status = "KREDIT";

      // Generate Surat Jalan
      const getSuratJalan = await TransaksiCabangModel.findAndCountAll({
        limit: 1,
        order: [["surat_jalan", "DESC"]],
        where: {
          ["surat_jalan"]: {
            [Op.like]: `%${"/" + month + "/" + year}%`,
          },
        },
      });
      const { count: count_sj, rows: rows_sj } = getSuratJalan;

      let countSj = 0;
      if (count_sj == 0) {
        countSj++;
      } else {
        countSj = parseInt(rows_sj[0].surat_jalan?.split("/")[3]) + 1;
      }
      countSj = countSj?.toString().padStart(5, "0");

      var surat_jalan = "SJ" + date_ + "/" + month + "/" + year + "/" + countSj;

      await TransaksiCabangModel.create({
        total_transaksi_cabang,
        no_faktur,
        uang1,
        uang2,
        uang_total,
        cabangId,
        payment_method1,
        payment_method2,
        discount,
        surat_jalan,
        transaksi_status,
        uuid: uuidv4(),
      }).then((result) => {
        responseJSON({ res, status: 200, data: result });
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getListTransaksiCabang = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getTransaksiCabang = await TransaksiCabangModel.findAndCountAll({
        where: condition,
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      responseJSON({
        res,
        status: 200,
        data: getPagingData(getTransaksiCabang, page, limit),
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getDetailTransaksiCabang = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getTransaksiCabang = await TransaksiCabangModel.findOne({
        where: {
          uuid: uuid,
        },
      });

      const getListTransaksiCabangDetail =
        await TransaksiCabangDetailModel.findAll({
          where: {
            transaksiCabangId: getTransaksiCabang?.id,
          },
        });

      responseJSON({
        res,
        status: 200,
        data: {
          dataInfo: getTransaksiCabang,
          listProduct: getListTransaksiCabangDetail,
        },
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteTransaksiCabang = async (req, res) => {
    const { uuid } = req.params;

    try {
      const deleteTransaksiCabang = await TransaksiCabangModel.destroy({
        where: {
          uuid: uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: deleteTransaksiCabang,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateTransaksiCabang = async (req, res) => {
    const { uuid } = req.params;
    const {
      total_transaksi_cabang,
      uang1,
      uang2,
      uang_total,
      cabangId,
      payment_method1,
      payment_method2,
      discount,
      transaksi_status
    } = req.body;

    transaksi_status ?? "KREDIT";
    try {
      const getDetailTransaksiCabang = await TransaksiCabangModel.findOne({
        where: {
          uuid: uuid,
        },
      });

      const updateTransaksiCabang = await getDetailTransaksiCabang.update({
        total_transaksi_cabang,
        uang1,
        uang2,
        uang_total,
        cabangId,
        payment_method1,
        payment_method2,
        discount,
        transaksi_status
      });

      responseJSON({ res, status: 200, data: updateTransaksiCabang });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
}

module.exports = new ControllerTransaksiCabang();
