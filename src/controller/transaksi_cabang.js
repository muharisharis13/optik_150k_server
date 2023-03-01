const {
  TransaksiCabangModel,
  CabangModel,
  TransaksiCabangDetailModel,
  ProductModel,
  CategoryModel,
} = require("../models");
const status = require("http-status");
const {
  filterObject,
  responseJSON,
  paging: { getPagination, getPagingData },
} = require("../../utils");
const { v4: uuidv4 } = require("uuid");
const { Op, Sequelize } = require("sequelize");

class ControllerTransaksiCabang {
  cancelTransaksiCabang = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getTransaksiCabang = await TransaksiCabangModel.findOne({
        where: {
          uuid,
        },
      });

      if (getTransaksiCabang) {
        const updateTransaksiCabangToCancel = await getTransaksiCabang.update({
          transaksi_status: "CANCEL",
        });

        const getListProduct = await TransaksiCabangDetailModel.findAll({
          where: {
            transaksiCabangId: getTransaksiCabang?.id,
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
            message: "Berhasil Cancel Penjualan Cabang",
            dataInfo: updateTransaksiCabangToCancel,
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

  //sudah
  pelunasanTransaksiCabang = async (req, res) => {
    const { uuid } = req.params;
    const { uang2, payment_method2 } = req.body;
    try {
      const getTransaksiCabang = await TransaksiCabangModel.findOne({
        where: {
          uuid,
        },
      });

      const updatePelunasanTransakasiCabang = await getTransaksiCabang.update({
        uang2,
        payment_method2,
        transaksi_status: "COMPLETE",
        total_uang: parseInt(getTransaksiCabang?.total_uang) + parseInt(uang2),
      });
      responseJSON({ res, status: 200, data: updatePelunasanTransakasiCabang });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  //bnlm di cek
  addTransaksiCabang = async (req, res) => {
    const {
      total_transaksi_cabang,
      uang1,
      uang2,
      uang_total,
      cabangId,
      payment_method1,
      payment_method2,
      discount,
      notes,
      listProduct = [],
      transaksi_status = "CREDIT",
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
      const getCountTransaksi = await TransaksiCabangModel.findAndCountAll({
        where: Sequelize.where(
          Sequelize.fn("date", Sequelize.col("createdAt")),
          "=",
          transaksi_date
        ), // Select createdAt as format date YYYY-MM-DD
        limit: 1,
        order: [["no_faktur", "DESC"]],
      });
      const { count, rows } = getCountTransaksi;
      let countTransaksi = count + 1;
      var transaksiNo = countTransaksi?.toString().padStart(6, "0");
      var no_faktur = date_ + transaksiNo;

      // Generate Surat Jalan
      const getSuratJalan = await TransaksiCabangModel.findAndCountAll({
        limit: 1,
        order: [["surat_jalan", "DESC"]],
        where: {
          ["surat_jalan"]: {
            [Op.like]: `%${"/" + month + "/" + year}%`,
          },
        },
      });
      const { count: count_sj, rows: rows_sj } = getSuratJalan;

      let countSj = 0;
      if (count_sj == 0) {
        countSj++;
      } else {
        countSj = parseInt(rows_sj[0].surat_jalan?.split("/")[3]) + 1;
      }
      countSj = countSj?.toString().padStart(5, "0");

      var surat_jalan = "SJ" + date_ + "/" + month + "/" + year + "/" + countSj;

      await TransaksiCabangModel.create({
        total_transaksi_cabang,
        no_faktur,
        uang1,
        uang2,
        uang_total,
        cabangId,
        payment_method1,
        payment_method2,
        discount,
        surat_jalan,
        transaksi_status,
        notes,
        uuid: uuidv4(),
      }).then(async (result) => {
        const transaksiCabangId = result?.id;
        listProduct.map(async (item) => {
          await TransaksiCabangDetailModel.create({
            uuid: uuidv4(),
            transaksiCabangId,
            productId: item?.productId,
            price: item?.price,
            qty: item?.qty,
            discount: 0,
            subtotal: item?.subtotal,
            notes: item?.notes || "-",
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

        const getListTransaksiCabangDetail =
          await TransaksiCabangDetailModel.findAll({
            where: {
              transaksiCabangId,
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
          data: { result, listProduct: getListTransaksiCabangDetail },
        });
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  //sudah
  getListTransaksiCabang = async (req, res) => {
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
      const getTransaksiCabang = await TransaksiCabangModel.findAndCountAll({
        where: condition,
        include: [
          {
            model: CabangModel,
            as: "cabang",
            attributes: {
              exclude: ["createdAt", "updatedAt", "uui"],
            },
            required: false,
          },
        ],
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      responseJSON({
        res,
        status: 200,
        data: getPagingData(getTransaksiCabang, page, limit),
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  //sudah
  getDetailTransaksiCabang = async (req, res) => {
    const { uuid } = req.params;
    try {
      const getTransaksiCabang = await TransaksiCabangModel.findOne({
        where: {
          uuid: uuid,
        },
        include: [
          {
            model: CabangModel,
            as: "cabang",
            attributes: {
              exclude: ["createdAt", "updatedAt", "uuid"],
            },
            required: false,
          },
        ],
      });

      const getListTransaksiCabangDetail =
        await TransaksiCabangDetailModel.findAll({
          where: {
            transaksiCabangId: getTransaksiCabang?.id,
          },
          include: [
            {
              model: ProductModel,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt", "uuid"],
              },
              include: [
                {
                  model: CategoryModel,
                  as: "category",
                  attributes: {
                    exclude: ["createdAt", "updatedAt", "uuid"],
                  },
                },
              ],
            },
          ],
        });

      responseJSON({
        res,
        status: 200,
        data: {
          dataInfo: getTransaksiCabang,
          listProduct: getListTransaksiCabangDetail,
        },
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  deleteTransaksiCabang = async (req, res) => {
    const { uuid } = req.params;

    try {
      const deleteTransaksiCabang = await TransaksiCabangModel.destroy({
        where: {
          uuid: uuid,
        },
      });

      responseJSON({
        res,
        status: 200,
        data: deleteTransaksiCabang,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };

  updateTransaksiCabang = async (req, res) => {
    const { uuid } = req.params;
    const {
      total_transaksi_cabang,
      uang1,
      uang2,
      uang_total,
      cabangId,
      payment_method1,
      payment_method2,
      discount,
      transaksi_status,
    } = req.body;

    transaksi_status ?? "CREDIT";
    try {
      const getDetailTransaksiCabang = await TransaksiCabangModel.findOne({
        where: {
          uuid: uuid,
        },
      });

      const updateTransaksiCabang = await getDetailTransaksiCabang.update({
        total_transaksi_cabang,
        uang1,
        uang2,
        uang_total,
        cabangId,
        payment_method1,
        payment_method2,
        discount,
        transaksi_status,
      });

      responseJSON({ res, status: 200, data: updateTransaksiCabang });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
}

module.exports = new ControllerTransaksiCabang();
