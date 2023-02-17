const { BeliModel } = require("../models");
const {
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerBeli {
  addBeli = async (req, res) => {
    const { beli_faktur, beli_tanggal, supplierId } = req.body;
    try {
      await BeliModel.create({
        beli_faktur,
        beli_tanggal,
        supplierId,
        uuid: uuidv4(),
      }).then((result) => {
        responseJSON({ res, status: 200, data: result });
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getListBeli = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getProduct = await BeliModel.findAndCountAll({
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

  getDetailBeli = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getDetailBeli = await BeliModel.findOne({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: getDetailBeli,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteBeli = async (req, res) => {
    const { uuid } = req.params;
    try {
      const hapusBeli = await BeliModel.destroy({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: hapusBeli,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateBeli = async (req, res) => {
    const { uuid } = req.params;
    const { beli_faktur, beli_tanggal, supplierId } = req.body;
    try {
      const getDetailBeli = await BeliModel.findOne({
        where: {
          uuid,
        },
      });

      const updateBeli = await getDetailBeli.update({
        beli_faktur,
        beli_tanggal,
        supplierId,
      });

      responseJSON({ res, status: 200, data: updateBeli });
    } catch (error) {
      responseJSON({ res, status: 500, data: result });
    }
  };
}

module.exports = new ControllerBeli();
