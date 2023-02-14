const { CategoryModel } = require("../models");
const {
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerCategory {
  addCategory = async (req, res) => {
    const { category_name } = req.body;
    try {
      await CategoryModel.create({
        category_name,
        uuid: uuidv4(),
      }).then((result) => {
        responseJSON({ res, status: 200, data: result });
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getListCategory = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getProduct = await CategoryModel.findAndCountAll({
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

  getDetailCategory = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getDetailCategory = await CategoryModel.findOne({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: getDetailCategory,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteCategory = async (req, res) => {
    const { uuid } = req.params;
    try {
      const hapusCategory = await CategoryModel.destroy({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: hapusCategory,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateCategory = async (req, res) => {
    const { uuid } = req.params;
    const { category_name } = req.body;
    try {
      const getDetailCategory = await CategoryModel.findOne({
        where: {
          uuid,
        },
      });

      const updateCategory = await getDetailCategory.update({
        category_name
      });

      responseJSON({ res, status: 200, data: updateCategory });
    } catch (error) {
      responseJSON({ res, status: 500, data: result });
    }
  };
}

module.exports = new ControllerCategory();
