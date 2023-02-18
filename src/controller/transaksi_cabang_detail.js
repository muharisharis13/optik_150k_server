const { TransaksiCabangDetailModel, CategoryModel } = require("../models");
const status = require("http-status");
const {
  filterObject,
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerTransaksiCabangDetail {
  addTransaksiCabangDetail = async (req, res) => {
    const { productCode, qty, discount } = req.body;
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var date = dateObj.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    var year = dateObj.getUTCFullYear();

    try {
      await TransaksiCabangDetailModel.create({
        productCode,
        qty,
        discount,
        uuid: uuidv4(),
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

  getListTransaksiCabangDetail = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getTransaksiCabangDetail = await TransaksiCabangDetailModel.findAndCountAll({
        where: condition,
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      responseJSON({
        res,
        status: 200,
        data: getPagingData(getTransaksiCabangDetail, page, limit),
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getDetailTransaksiCabangDetail = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getTransaksiCabangDetail = await TransaksiCabangDetailModel.findOne({
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
        data: getTransaksiCabangDetail,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteTransaksiCabangDetail = async (req, res) => {
    const { uuid } = req.params;

    try {
      const deleteTransaksiCabangDetail = await TransaksiCabangDetailModel.destroy({
        where: {
          uuid: uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: deleteTransaksiCabangDetail,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateTransaksiCabangDetail = async (req, res) => {
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
      const getDetailTransaksiCabangDetail = await TransaksiCabangDetailModel.findOne({
        where: {
          uuid: uuid,
        },
      });

      const updateTransaksiCabangDetail = await getDetailTransaksiCabangDetail.update({
        product_name,
        uom,
        capital_price,
        price,
        stock,
        min_stock,
        category_id,
        serial_number,
      });

      responseJSON({ res, status: 200, data: updateTransaksiCabangDetail });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
}

module.exports = new ControllerTransaksiCabangDetail();
