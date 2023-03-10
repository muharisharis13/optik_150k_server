const { ProductModel, CategoryModel } = require("../models");
const status = require("http-status");
const {
  filterObject,
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const converExcel = require("convert-excel-to-json");
// Require library
var xl = require("excel4node");

// Create a new instance of a Workbook class
var wb = new xl.Workbook();

// Add Worksheets to the workbook
var ws = wb.addWorksheet("Sheet 1");

const arrColumn = [
  "id",
  "uuid",
  "productCode",
  "product_name",
  "uom",
  "capital_price",
  "price",
  "stock",
  "min_stock",
  "categoryId",
  "serial_number",
  "createdAt",
  "updatedAt",
];

class ControllerProduct {
  exportCSVProduct = async (req, res) => {
    try {
      const getListProduct = await ProductModel.findAll({
        raw: true,
      });

      for (let i = 0; arrColumn.length > i; i++) {
        ws.cell(1, i + 1).string(arrColumn[i]);
      }

      getListProduct.map((item, idx) => {
        ws.cell(idx + 2, 1).number(item.id);
        ws.cell(idx + 2, 2).string(item.uuid);
        ws.cell(idx + 2, 3).string(item.productCode);
        ws.cell(idx + 2, 4).string(item.product_name);
        ws.cell(idx + 2, 5).string(item.uom);
        ws.cell(idx + 2, 6).number(item.capital_price);
        ws.cell(idx + 2, 7).number(item.price);
        ws.cell(idx + 2, 8).number(item.stock);
        ws.cell(idx + 2, 9).number(item.min_stock);
        ws.cell(idx + 2, 10).number(item.categoryId);
        ws.cell(idx + 2, 11).string(item.serial_number);
        ws.cell(idx + 2, 12).string(item.createdAt);
        ws.cell(idx + 2, 13).string(item.updatedAt);
      });
      wb.write("product_csv_" + new Date().getTime() + ".csv", res);
    } catch (error) {
      responseJSON({ res, status: 500, data: error.message });
    }
  };
  uploadCSVProduct = async (req, res) => {
    const file = req.file;
    try {
      const getSourceFile = `./${file.path}`;

      const result = converExcel({
        sourceFile: getSourceFile,
        header: { rows: 1 },
        columnToKey: {
          "*": "{{columnHeader}}",
        },
      });

      // console.log({ result, file, getSourceFile });

      result["Sheet 1"].map(async (item, idx) => {
        await ProductModel.findOne({
          where: {
            uuid: item.uuid,
          },
        }).then(async (updateData) => {
          await updateData.update({
            productCode: item.productCode,
            product_name: item.product_name,
            uom: item.uom,
            capital_price: item.capital_price,
            price: item.price,
            stock: item.stock,
            min_stock: item.min_stock,
            categoryId: item.categoryId,
            serial_number: item.serial_number,
          });
        });
      });
      responseJSON({ res, status: 200, data: "Berhasil Import Product" });
    } catch (error) {
      responseJSON({ res, status: 500, data: error.message });
    }
  };
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

      console.log({rows})

      let product_code_new =
        parseInt(rows[0]?.productCode?.split("BR")[1] || 0) + 1;
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
        message: status[400],
        data:error.message
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

  getListFreeProduct = async (req, res) => {
    const { page = 1, size = 10 } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      ["price"]: 0,
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
