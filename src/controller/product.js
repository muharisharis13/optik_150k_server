const { ProductModel, CategoryModel } = require("../models");
const status = require("http-status");
const {
  filterObject,
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerProduct {
  addProduct = async (req, res) => {
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
      const getCountProduct = await ProductModel.findAndCountAll({
        limit: 1,
        order: [["productCode", "DESC"]],
      });
      const { count, rows } = getCountProduct;

      let product_code_new =
        parseInt(rows[0].productCode?.split("BR")[1] || 0) + 1;
      console.log({ product_code_new });
      product_code_new = "BR" + product_code_new?.toString().padStart(7, "0");
      await ProductModel.create({
        productCode: product_code_new,
        product_name,
        uom,
        capital_price,
        price,
        stock,
        min_stock,
        categoryId: category_id,
        serial_number,
        uuid: uuidv4(),
      }).then((result) => {
        res.status(200).json({
          code: 200,
          message: status[200],
          data: filterObject(result, [
            "productCode",
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

  getListProduct = async (req, res) => {
    const {
      page = 1,
      size = 10,
      column_name = "product_name",
      query = "",
    } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [`$${column_name}$`]: {
        [Op.like]: `%${query ?? "*"}%`,
      },
    };
    try {
      const getProduct = await ProductModel.findAndCountAll({
        where: condition,
        include: [
          {
            model: CategoryModel,
            as: "category",
            attributes: ["category_name"],
          },
        ],
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

  getDetailProduct = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getProduct = await ProductModel.findOne({
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
        data: getProduct,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteProduct = async (req, res) => {
    const { uuid } = req.params;

    try {
      const deleteProduct = await ProductModel.destroy({
        where: {
          uuid: uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: deleteProduct,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateProduct = async (req, res) => {
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
      const getDetailProduct = await ProductModel.findOne({
        where: {
          uuid: uuid,
        },
      });

      const updateProduct = await getDetailProduct.update({
        product_name,
        uom,
        capital_price,
        price,
        stock,
        min_stock,
        categoryId: category_id,
        serial_number,
      });

      responseJSON({ res, status: 200, data: updateProduct });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
}

module.exports = new ControllerProduct();
