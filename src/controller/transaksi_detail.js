const { TransaksiDetailModel, CategoryModel } = require("../models");
const status = require("http-status");
const {
  filterObject,
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerTransaksiDetail {
  addTransaksiDetail = async (req, res) => {
    const { productCode, qty, discount } = req.body;
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var date = dateObj.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    var year = dateObj.getUTCFullYear();

    try {
      await TransaksiDetailModel.create({
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

  getListTransaksiDetail = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getTransaksiDetail = await TransaksiDetailModel.findAndCountAll({
        where: condition,
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      responseJSON({
        res,
        status: 200,
        data: getPagingData(getTransaksiDetail, page, limit),
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getDetailTransaksiDetail = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getTransaksiDetail = await TransaksiDetailModel.findOne({
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
        data: getTransaksiDetail,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteTransaksiDetail = async (req, res) => {
    const { uuid } = req.params;

    try {
      const deleteTransaksiDetail = await TransaksiDetailModel.destroy({
        where: {
          uuid: uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: deleteTransaksiDetail,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateTransaksiDetail = async (req, res) => {
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
      const getDetailTransaksiDetail = await TransaksiDetailModel.findOne({
        where: {
          uuid: uuid,
        },
      });

      const updateTransaksiDetail = await getDetailTransaksiDetail.update({
        product_name,
        uom,
        capital_price,
        price,
        stock,
        min_stock,
        category_id,
        serial_number,
      });

      responseJSON({ res, status: 200, data: updateTransaksiDetail });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
}

module.exports = new ControllerTransaksiDetail();
