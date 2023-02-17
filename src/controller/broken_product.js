const { BrokenProductModel } = require("../models");
const {
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerBrokenProduct {
  addBrokenProduct = async (req, res) => {
    const { productCode, qty, notes, broken_date } = req.body;
    try {
      await BrokenProductModel.create({
        productCode,
        qty,
        notes,
        broken_date,
        uuid: uuidv4(),
      }).then((result) => {
        responseJSON({ res, status: 200, data: result });
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getListBrokenProduct = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getProduct = await BrokenProductModel.findAndCountAll({
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

  getDetailBrokenProduct = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getDetailBrokenProduct = await BrokenProductModel.findOne({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: getDetailBrokenProduct,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteBrokenProduct = async (req, res) => {
    const { uuid } = req.params;
    try {
      const hapusBrokenProduct = await BrokenProductModel.destroy({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: hapusBrokenProduct,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateBrokenProduct = async (req, res) => {
    const { uuid } = req.params;
    const { productCode, qty, notes, broken_date } = req.body;
    try {
      const getDetailBrokenProduct = await BrokenProductModel.findOne({
        where: {
          uuid,
        },
      });

      const updateBrokenProduct = await getDetailBrokenProduct.update({
        productCode,
        qty,
        notes,
        broken_date,
      });

      responseJSON({ res, status: 200, data: updateBrokenProduct });
    } catch (error) {
      responseJSON({ res, status: 500, data: result });
    }
  };
}

module.exports = new ControllerBrokenProduct();
