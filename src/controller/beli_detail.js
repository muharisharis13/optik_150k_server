const { BeliDetailModel } = require("../models");
const {
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerBeliDetail {
  addBeliDetail = async (req, res) => {
    const { beli_faktur, beli_tanggal, productCode, price, qty, total } =
      req.body;
    try {
      await BeliDetailModel.create({
        beli_faktur,
        beli_tanggal,
        productCode,
        price,
        qty,
        total,
        uuid: uuidv4(),
      }).then((result) => {
        responseJSON({ res, status: 200, data: result });
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getListBeliDetail = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getProduct = await BeliDetailModel.findAndCountAll({
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

  getDetailBeliDetail = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getDetailBeliDetail = await BeliDetailModel.findOne({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: getDetailBeliDetail,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteBeliDetail = async (req, res) => {
    const { uuid } = req.params;
    try {
      const hapusBeliDetail = await BeliDetailModel.destroy({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: hapusBeliDetail,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateBeliDetail = async (req, res) => {
    const { uuid } = req.params;
    const { beli_faktur, beli_tanggal, productCode, price, qty, total } =
      req.body;
    try {
      const getDetailBeliDetail = await BeliDetailModel.findOne({
        where: {
          uuid,
        },
      });

      const updateBeliDetail = await getDetailBeliDetail.update({
        beli_faktur,
        beli_tanggal,
        productCode,
        price,
        qty,
        total
      });

      responseJSON({ res, status: 200, data: updateBeliDetail });
    } catch (error) {
      responseJSON({ res, status: 500, data: result });
    }
  };
}

module.exports = new ControllerBeliDetail();
