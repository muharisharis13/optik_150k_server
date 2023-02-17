const { SupplierModel } = require("../models");
const {
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerSupplier {
  addSupplier = async (req, res) => {
    const { supplier_name, supplier_address, supplier_phone } = req.body;
    try {
      await SupplierModel.create({
        supplier_name,
        supplier_address,
        supplier_phone,
        uuid: uuidv4(),
      }).then((result) => {
        responseJSON({ res, status: 200, data: result });
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getListSupplier = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getProduct = await SupplierModel.findAndCountAll({
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

  getDetailSupplier = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getDetailSupplier = await SupplierModel.findOne({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: getDetailSupplier,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteSupplier = async (req, res) => {
    const { uuid } = req.params;
    try {
      const hapusSupplier = await SupplierModel.destroy({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: hapusSupplier,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateSupplier = async (req, res) => {
    const { uuid } = req.params;
    const { supplier_name, supplier_address, supplier_phone } = req.body;
    try {
      const getDetailSupplier = await SupplierModel.findOne({
        where: {
          uuid,
        },
      });

      const updateSupplier = await getDetailSupplier.update({
        supplier_name,
        supplier_address,
        supplier_phone,
      });

      responseJSON({ res, status: 200, data: updateSupplier });
    } catch (error) {
      responseJSON({ res, status: 500, data: result });
    }
  };
}

module.exports = new ControllerSupplier();
