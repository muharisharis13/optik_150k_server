const { CabangModel } = require("../models");
const {
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerCabang {
  addCabang = async (req, res) => {
    const { nama_cabang, alamat } = req.body;

    try {
      await CabangModel.create({
        nama_cabang,
        alamat,
        uuid: uuidv4(),
      }).then((result) => {
        responseJSON({ res, status: 200, data: result });
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getListCabang = async (req, res) => {
    const {
      page = 1,
      size = 10,
      column_name = "nama_cabang",
      query = "",
    } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getCabang = await CabangModel.findAndCountAll({
        where: condition,
        limit,
        offset,
        order: [["nama_cabang", "ASC"]],
      });

      responseJSON({
        res,
        status: 200,
        data: getPagingData(getCabang, page, limit),
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getDetailCabang = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getCabang = await CabangModel.findOne({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: getCabang,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteCabang = async (req, res) => {
    const { uuid } = req.params;

    try {
      const deleteCabang = await CabangModel.destroy({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: deleteCabang,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateCabang = async (req, res) => {
    const { uuid } = req.params;
    const { nama_cabang, alamat } = req.body;

    try {
      const getDetailCabang = await CabangModel.findOne({
        where: {
          uuid,
        },
      });

      const updateCabang = await getDetailCabang.update({
        nama_cabang,
        alamat,
      });

      responseJSON({ res, status: 200, data: updateCabang });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
}

module.exports = new ControllerCabang();
