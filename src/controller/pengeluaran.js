const { PengeluaranModel } = require("../models");
const {
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerPengeluaran {
  addPengeluaran = async (req, res) => {
    const { jenis_pengeluaran, amount, keterangan, employee } = req.body;
    try {
      await PengeluaranModel.create({
        jenis_pengeluaran,
        amount,
        keterangan,
        employee,
        uuid: uuidv4(),
      }).then((result) => {
        responseJSON({ res, status: 200, data: result });
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getListPengeluaran = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getPengeluaran = await PengeluaranModel.findAndCountAll({
        where: condition,
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      responseJSON({
        res,
        status: 200,
        data: getPagingData(getPengeluaran, page, limit),
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getDetailPengeluaran = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getDetailPengeluaran = await PengeluaranModel.findOne({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: getDetailPengeluaran,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deletePengeluaran = async (req, res) => {
    const { uuid } = req.params;
    try {
      const hapusPengeluaran = await PengeluaranModel.destroy({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: hapusPengeluaran,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updatePengeluaran = async (req, res) => {
    const { uuid } = req.params;
    const { jenis_pengeluaran, amount, keterangan, employee } = req.body;
    try {
      const getDetailPengeluaran = await PengeluaranModel.findOne({
        where: {
          uuid,
        },
      });

      const updatePengeluaran = await getDetailPengeluaran.update({
        jenis_pengeluaran,
        amount,
        keterangan,
        employee,
      });

      responseJSON({ res, status: 200, data: updatePengeluaran });
    } catch (error) {
      responseJSON({ res, status: 500, data: error.message });
    }
  };
}

module.exports = new ControllerPengeluaran();
