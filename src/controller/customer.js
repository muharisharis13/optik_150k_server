const { CustomerModel } = require("../models");
const {
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerCustomer {
  addCustomer = async (req, res) => {
    const { customer_name, no_hp, alamat } = req.body;
    const getCountCustomer = await CustomerModel.findAndCountAll({
      limit: 1,
      order: [["kdCustomer", "DESC"]],
    });
    const { count } = getCountCustomer;
    let new_code = count + 1;

    var kdCustomer = "C-" + new_code?.toString().padStart(6, "0");
    try {
      await CustomerModel.create({
        kdCustomer,
        customer_name,
        no_hp,
        alamat,
        uuid: uuidv4(),
      }).then((result) => {
        responseJSON({ res, status: 200, data: result });
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: result });
    }
  };

  getListCustomer = async (req, res) => {
    const { page = 1, size = 10, column_name = "id", query = "" } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [column_name]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getCustomer = await CustomerModel.findAndCountAll({
        where: condition,
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      responseJSON({
        res,
        status: 200,
        data: getPagingData(getCustomer, page, limit),
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getDetailCustomer = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getDetailCustomer = await CustomerModel.findOne({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: getDetailCustomer,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteCustomer = async (req, res) => {
    const { uuid } = req.params;
    try {
      const hapusCustomer = await CustomerModel.destroy({
        where: {
          uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: hapusCustomer,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateCustomer = async (req, res) => {
    const { uuid } = req.params;
    const { customer_name, no_hp, alamat } = req.body;
    try {
      const getDetailCustomer = await CustomerModel.findOne({
        where: {
          uuid,
        },
      });

      const updateCustomer = await getDetailCustomer.update({
        customer_name, no_hp, alamat,
      });

      responseJSON({ res, status: 200, data: updateCustomer });
    } catch (error) {
      responseJSON({ res, status: 500, data: result });
    }
  };
}

module.exports = new ControllerCustomer();
