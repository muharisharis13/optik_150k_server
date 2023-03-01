const {
  TransaksiModel,
  TransaksiDetailModel,
  CustomerModel,
  ProductModel,
  CategoryModel,
  CaraBayarModel,
  PengeluaranModel,
  TransaksiCabangModel,
  TransaksiCabangDetailModel,
} = require("../models");
const status = require("http-status");
const {
  filterObject,
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op, Sequelize } = require("sequelize");
const transaksi_detail = require("../models/transaksi_detail");
const moment = require("moment");

class ControllerTransaksi {
  resumeTransaksi = async (req, res) => {
    const midNight = new Date();
    midNight.setHours(0, 0, 0, 0);
    try {
      const getCaraBayar = await CaraBayarModel.findAll({
        raw: true,
      });
      const getTransaksi = await TransaksiModel.findAll({
        where: {
          createdAt: {
            [Op.gte]: midNight,
            [Op.lte]: new Date(new Date() + 24 * 60 * 60 * 1000),
          },
        },
        raw: true,
      });
      const getTransaksiCabang = await TransaksiCabangModel.findAll({
        where: {
          createdAt: {
            [Op.gte]: midNight,
            [Op.lte]: new Date(new Date() + 24 * 60 * 60 * 1000),
          },
        },
        raw: true,
      });

      const getPengeluaran = await PengeluaranModel.findAll({
        where: {
          createdAt: {
            [Op.gte]: midNight,
            [Op.lte]: new Date(new Date() + 24 * 60 * 60 * 1000),
          },
        },
        raw: true,
      });

      const newTransaksi = getTransaksiCabang
        ?.map((item) => ({
          ...item,
          total_transaksi: item.total_transaksi_cabang,
        }))
        .concat(getTransaksi);

      const metodePembayaran1 = getCaraBayar?.map((item) => ({
        type: item.cara_bayar_name,
        result: newTransaksi
          .filter(
            (filter) =>
              filter.payment_method1.toLowerCase() ==
              item.cara_bayar_name.toLowerCase()
          )
          .map((item) => ({
            total_transaksi: item?.total_transaksi,
            payment_method1: item?.payment_method1,
            creadtedAt: item.createdAt,
          })),
        total: newTransaksi
          .filter(
            (filter) =>
              filter.payment_method1.toLowerCase() ==
              item.cara_bayar_name.toLowerCase()
          )
          .map((item) => ({
            total_transaksi: item?.total_transaksi,
            payment_method1: item?.payment_method1,
            payment_method2: item.payment_method2,
          }))
          .reduce((prev, curr) => prev + parseInt(curr?.total_transaksi), 0),
      }));

      const getTransaksiMethodCash = await TransaksiModel.findAll({
        where: {
          createdAt: {
            [Op.lt]: new Date(),
            [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
          },
          payment_method1: {
            [Op.like]: `%Cash%`,
          },
        },
      });

      const newTotalTransaksiMethodCash = getTransaksiMethodCash.reduce(
        (prev, curr) => prev + parseInt(curr.total_transaksi),
        0
      );

      const newTotalPengeluaran = getPengeluaran?.reduce(
        (prev, curr) => prev + parseInt(curr.amount),
        0
      );

      responseJSON({
        res,
        status: 200,
        data: {
          penjualanToko: newTotalTransaksiMethodCash - newTotalPengeluaran,
          pengeluaran: {
            result: getPengeluaran.map((item) => ({
              amount: item.amount,
            })),
            total: getPengeluaran?.reduce(
              (prev, curr) => prev + parseInt(curr.amount),
              0
            ),
          },
          metodePembayaran1,
        },
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
  transaksiDay = async (req, res) => {
    const midNight = new Date();
    midNight.setHours(0, 0, 0, 0);
    try {
      const getListTransaksiDetailCabang =
        await TransaksiCabangDetailModel.findAll({
          where: {
            createdAt: {
              [Op.gte]: midNight,
              [Op.lte]: new Date(new Date() + 24 * 60 * 60 * 1000),
            },
          },
          include: [
            {
              model: ProductModel,
              as: "product",
              attributes: {
                exclude: ["uuid", "createdAt", "updatedAt"],
              },
            },
          ],
        });
      const getListTransaksiDetail = await TransaksiDetailModel.findAll({
        where: {
          createdAt: {
            [Op.gte]: midNight,
            [Op.lte]: new Date(new Date() + 24 * 60 * 60 * 1000),
          },
        },
        include: [
          {
            model: ProductModel,
            as: "product",
            attributes: {
              exclude: ["uuid", "createdAt", "updatedAt"],
            },
          },
        ],
      });
      responseJSON({
        res,
        status: 200,
        data: getListTransaksiDetail.concat(getListTransaksiDetailCabang),
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
  cancelTransaksi = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getTransaksi = await TransaksiModel.findOne({
        where: {
          uuid,
        },
      });

      if (getTransaksi) {
        const updateTransaksiToCancel = await getTransaksi.update({
          transaksi_status: "CANCEL",
        });

        const getListProduct = await TransaksiDetailModel.findAll({
          where: {
            transaksiId: getTransaksi?.id,
          },
        });

        getListProduct?.map(async (item) => {
          await ProductModel.findOne({
            where: {
              id: item.productId,
            },
          }).then((resultProduct) => {
            resultProduct.update({
              stock: resultProduct?.stock + item.qty,
            });
          });
        });

        responseJSON({
          res,
          status: 200,
          data: {
            message: "Berhasil Cancel Penjualan",
            dataInfo: updateTransaksiToCancel,
          },
        });
      } else {
        responseJSON({ res, status: 200, data: "Transaksi Tidak Ditemukan" });
      }

      responseJSON();
    } catch (error) {
      // responseJSON({ res, status: 500, data: "Error" });
    }
  };
  pelunasanTransaksi = async (req, res) => {
    const { uuid } = req.params;
    const { uang2, payment_method2 } = req.body;
    try {
      const getTransaksi = await TransaksiModel.findOne({
        where: {
          uuid,
        },
      });

      const updatePelunasanTransakasi = await getTransaksi.update({
        uang2,
        payment_method2,
        transaksi_status: "COMPLETE",
        total_uang: parseInt(getTransaksi?.total_uang) + parseInt(uang2),
      });
      responseJSON({ res, status: 200, data: updatePelunasanTransakasi });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  addTransaksi = async (req, res) => {
    const {
      total_transaksi,
      uang1,
      uang2,
      total_uang,
      customerId,
      payment_method1,
      payment_method2,
      discount,
      listProduct = [],
      notes,
      transaksi_status,
    } = req.body;

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var date = dateObj.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    var year = dateObj.getUTCFullYear();
    var transaksi_date = `${year}-${month}-${date}`;
    var date_ = `${date}${month}${year}`;

    try {
      const getCountTransaksi = await TransaksiModel.findAndCountAll({
        where: {
          no_faktur: {
            [Op.like]: `%${date_}%`,
          },
        },
        limit: 1,
        order: [["no_faktur", "DESC"]],
      });
      console.log({
        getCountTransaksi,
        date_,
        // list: await TransaksiModel.findAll({
        //   raw: true,
        // }),
      });
      // stop;
      const { count, rows } = getCountTransaksi;

      let countTransaksi = parseInt(count || 0) + 1;
      var transaksiNo = countTransaksi?.toString().padStart(6, "0");
      var no_faktur = date_ + transaksiNo;

      await TransaksiModel.create({
        no_faktur,
        total_transaksi,
        uang1,
        uang2,
        total_uang,
        customerId,
        payment_method1,
        payment_method2,
        transaksi_status:
          transaksi_status === "Lunas" ? "COMPLETE" : transaksi_status,
        discount,
        uuid: uuidv4(),
        notes: notes,
      }).then(async (result) => {
        const transaksiId = result?.id;
        listProduct?.map(async (item) => {
          await TransaksiDetailModel.create({
            uuid: uuidv4(),
            transaksiId,
            productId: item.productId,
            price: item.price,
            qty: item.qty,
            discount: 0,
            subtotal: item.subtotal,
            notes: item.notes ?? "-",
          });

          await ProductModel.findOne({
            where: {
              id: item.productId,
            },
          }).then((resultProduct) => {
            resultProduct.update({
              stock: parseInt(resultProduct.stock) - parseInt(item.qty),
            });
          });
        });
        const getListTransaksiDetail = await TransaksiDetailModel.findAll({
          where: {
            transaksiId,
          },
          include: [
            {
              model: ProductModel,
              as: "product",
              attributes: {
                exclude: ["uuid", "createdAt", "updatedAt"],
              },
            },
          ],
        });
        responseJSON({
          res,
          status: 200,
          data: { result, listProduct: getListTransaksiDetail },
        });
      });
    } catch (error) {
      responseJSON({ res, status: 400, data: error });
    }
  };

  getListTransaksi = async (req, res) => {
    const {
      page = 1,
      size = 10,
      column_name = "no_faktur",
      query = "",
    } = req.query;
    const { limit, offset } = getPagination(page, size);

    const condition = {
      [`$${column_name}$`]: {
        [Op.like]: `%${query ?? ""}%`,
      },
    };
    try {
      const getTransaksi = await TransaksiModel.findAndCountAll({
        where: condition,
        include: [
          {
            model: CustomerModel,
            as: "customer",
            attributes: {
              exclude: ["uuid", "createdAt", "updatedAt"],
            },
          },
        ],
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      responseJSON({
        res,
        status: 200,
        data: getPagingData(getTransaksi, page, limit),
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  getDetailTransaksi = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getTransaksi = await TransaksiModel.findOne({
        where: {
          uuid: uuid,
        },
        include: [
          {
            model: CustomerModel,
            as: "customer",
            attributes: {
              exclude: ["uuid", "createdAt", "updatedAt"],
            },
          },
        ],
      });

      const getListTransaksiDetail = await TransaksiDetailModel.findAll({
        where: {
          transaksiId: getTransaksi?.id,
        },
        include: [
          {
            model: ProductModel,
            as: "product",
            attributes: {
              exclude: ["uuid", "createdAt", "updatedAt"],
            },
            include: [
              {
                model: CategoryModel,
                as: "category",
                attributes: {
                  exclude: ["uuid", "createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
        attributes: {
          exclude: ["transaksiId"],
        },
      });
      responseJSON({
        res,
        status: 200,
        data: {
          data_info: getTransaksi,
          listProduct: getListTransaksiDetail,
        },
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteTransaksi = async (req, res) => {
    const { uuid } = req.params;

    try {
      const deleteTransaksi = await TransaksiModel.destroy({
        where: {
          uuid: uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: deleteTransaksi,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateTransaksi = async (req, res) => {
    const { uuid } = req.params;
    const {
      total_transaksi,
      uang1,
      uang2,
      total_uang,
      customerId,
      payment_method1,
      payment_method2,
      discount,
      transaksi_status,
    } = req.body;

    try {
      const getDetailTransaksi = await TransaksiModel.findOne({
        where: {
          uuid: uuid,
        },
      });

      transaksi_status = transaksi_status ?? "COMPLETE";

      const updateTransaksi = await getDetailTransaksi.update({
        total_transaksi,
        uang1,
        uang2,
        total_uang,
        customerId,
        payment_method1,
        payment_method2,
        discount,
        transaksi_status,
      });

      responseJSON({ res, status: 200, data: updateTransaksi });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
}

module.exports = new ControllerTransaksi();
