const { TransaksiModel, CategoryModel } = require("../models");
const status = require("http-status");
const {
  filterObject,
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerTransaksi {
  addTransaksi = async (req, res) => {
    const {
      total,
      uang1,
      uang2,
      uang_total,
      kurang_total,
      kembalian_total,
      uuid_user,
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

    try {
      const getCountTransaksi = await TransaksiModel.findAndCountAll({
        limit: 1,
        order: [["transaksiNo", "DESC"]],
      });
      const { count, rows } = getCountTransaksi;
      let new_code = count + 1;

      var transaksiNo = "KD-" + new_code?.toString().padStart(7, "0");
      if (rows[0].transaksiNo == transaksiNo) {
        let product_code_new =
          parseInt(rows[0].transaksiNo?.split("BR")[1]) + 1;
        product_code_new = "BR" + product_code_new?.toString().padStart(7, "0");
        await TransaksiModel.create({
          transaksiNo: product_code_new,
          transaksi_date,
          total,
          uang1,
          uang2,
          uang_total,
          kurang_total,
          kembalian_total,
          uuid_user,
          payment_method1,
          payment_method2,
          discount,
          uuid: uuidv4(),
        }).then((result) => {
          res.status(200).json({
            code: 200,
            message: status[200],
            data: filterObject(result, [
              "transaksiNo",
              "product_name",
              "capital_price",
              "createdAt",
              "updatedAt",
            ]),
          });
        });
      } else {
        await TransaksiModel.create({
          transaksiNo,
          product_name,
          uom,
          capital_price,
          price,
          stock,
          min_stock,
          category_id,
          serial_number,
          uuid: uuidv4(),
        }).then((result) => {
          res.status(200).json({
            code: 200,
            message: status[200],
            data: filterObject(result, [
              "transaksiNo",
              "product_name",
              "capital_price",
              "createdAt",
              "updatedAt",
            ]),
          });
        });
      }
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
        include: [
          {
            model: CategoryModel,
            as: "category",
            attributes: ["id", "category_name"],
          },
        ],
      });

      responseJSON({
        res,
        status: 200,
        data: getTransaksi,
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
      product_name,
      uom,
      capital_price,
      price,
      stock,
      min_stock,
      category_id,
      serial_number,
    } = req.body;

    try {
      const getDetailTransaksi = await TransaksiModel.findOne({
        where: {
          uuid: uuid,
        },
      });

      const updateTransaksi = await getDetailTransaksi.update({
        product_name,
        uom,
        capital_price,
        price,
        stock,
        min_stock,
        category_id,
        serial_number,
      });

      responseJSON({ res, status: 200, data: updateTransaksi });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
}

module.exports = new ControllerTransaksi();
