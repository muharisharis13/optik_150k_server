const { CaraBayarModel } = require("../models");
const {
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerCaraBayar {
  addCaraBayar = async (req, res) => {
    const { cara_bayar_name } = req.body;
    try {
      await CaraBayarModel.create({
        cara_bayar_name,
        uuid: uuidv4(),
      }).then((result) => {
        responseJSON({ res, status: 200, data: result });
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error.message });
    }
  };

  getListCaraBayar = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getProduct = await CaraBayarModel.findAndCountAll({
        where: condition,
        limit,
        offset,
        order: [["cara_bayar_name", "ASC"]],
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

  getDetailCaraBayar = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getDetailCaraBayar = await CaraBayarModel.findOne({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: getDetailCaraBayar,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteCaraBayar = async (req, res) => {
    const { uuid } = req.params;
    try {
      const hapusCaraBayar = await CaraBayarModel.destroy({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: hapusCaraBayar,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateCaraBayar = async (req, res) => {
    const { uuid } = req.params;
    const { cara_bayar_name } = req.body;
    try {
      const getDetailCaraBayar = await CaraBayarModel.findOne({
        where: {
          uuid,
        },
      });

      const updateCaraBayar = await getDetailCaraBayar.update({
        cara_bayar_name
      });

      responseJSON({ res, status: 200, data: updateCaraBayar });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
}

module.exports = new ControllerCaraBayar();
