const {
  BeliModel,
  BeliDetailModel,
  SupplierModel,
  ProductModel,
} = require("../models");
const {
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class ControllerBeli {
  addBeli = async (req, res) => {
    const { beli_tanggal, supplierId, listProduct = [] } = req.body;
    const getCountBeli = await BeliModel.findAndCountAll({
      limit: 1,
      order: [["no_faktur_beli", "DESC"]],
    });
    const { count, rows } = getCountBeli;

    let beli_faktur_new =
      parseInt(rows[0]?.no_faktur_beli?.split("BI-")[1] || 0) + 1;
    var no_faktur_beli = "BI-" + beli_faktur_new?.toString().padStart(7, "0");

    try {
      await BeliModel.create({
        no_faktur_beli,
        beli_tanggal,
        supplierId,
        uuid: uuidv4(),
      }).then((result) => {
        listProduct.map(async (item) => {
          await BeliDetailModel.create({
            beliId: result?.id,
            uuid: uuidv4(),
            productId: item?.productId,
            price: item?.capital_price,
            qty: item?.qty,
            subtotal: item?.subtotal,
          });

          await ProductModel.findOne({
            where: {
              id: item?.productId,
            },
          }).then(async (resultProduct) => {
            await resultProduct.update({
              stock: parseInt(resultProduct?.stock) + parseInt(item?.qty),
              price: item?.price,
              capital_price: item?.capital_price,
              branch_price: item?.branch_price,
            });
          });
        });
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
      [`$${column_name}$`]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getProduct = await BeliModel.findAndCountAll({
        where: condition,
        limit,
        offset,
        order: [["id", "DESC"]],
        include: [
          {
            model: SupplierModel,
            as: "supplier",
            attributes: {
              exclude: ["creadtedAt", "upadatedAt", "uuid"],
            },
          },
        ],
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

        include: [
          {
            model: SupplierModel,
            as: "supplier",
            attributes: {
              exclude: ["creadtedAt", "upadatedAt", "uuid"],
            },
          },
        ],
      });

      const getListBeliDetail = await BeliDetailModel.findAll({
        where: {
          beliId: getDetailBeli?.id,
        },
        include: [
          {
            model: ProductModel,
            as: "product",
            attributes: {
              exclude: ["creadtedAt", "upadatedAt", "uuid"],
            },
          },
        ],
      });

      responseJSON({
        res,
        status: 200,
        data: {
          dataInfo: getDetailBeli,
          listProduct: getListBeliDetail,
        },
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
