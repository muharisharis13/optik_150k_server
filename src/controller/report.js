const { responseJSON } = require("../../utils");
const {
  ProductModel,
  CategoryModel,
  TransaksiModel,
  CustomerModel,
  TransaksiDetailModel,
  CaraBayarModel,
  TransaksiCabangModel,
  TransaksiCabangDetailModel,
  CabangModel,
  BeliModel,
  SupplierModel,
  BeliDetailModel,
  KwitansiModel,
  PengeluaranModel,
} = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

const newStartDate = (date) => {
  let newDate = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000);
  newDate.setHours(0, 0, 0, 0);

  return newDate;
};

const midNight = (dateParam) => {
  let date = new Date(dateParam);
  date.setHours(0, 0, 0, 0);
  return date;
};
class ControllerReport {
  getListTransaksiNew = async (req, res) => {
    const { start, end } = req.query;
    try {
      const getListTransaksi = await TransaksiDetailModel.findAll({
        where: {
          createdAt: {
            [Op.gte]: `${start}`,
            [Op.lte]: `${new Date(
              new Date(end).getTime() + 24 * 60 * 60 * 1000
            )}`,
          },
        },
      });
      responseJSON({
        res,
        status: 200,
        data: { date: moment(end).format("YYYY-MM-DD"), getListTransaksi },
      });
    } catch (error) {
      console.log(error);
    }
  };

  getListTransaksiCabang = async (req, res) => {
    const {
      from_datetime,
      until_datetime,
      cabangId,
      categoryId,
      productId,
      paymentMethod,
    } = req.query;

    try {
      const listTransaksi = await TransaksiCabangModel.findAll({
        where: {
          transaksi_status: "CREDIT",
        },
        include: [
          {
            model: CabangModel,
            as: "cabang",
            attributes: {
              exclude: ["uuid", "createdAt", "updatedAt"],
            },
          },
        ],
      });

      const listDetailTransaksi = await TransaksiCabangDetailModel.findAll({
        where: {
          createdAt: {
            [Op.gte]: `${midNight(from_datetime)}`,
            [Op.lte]: `${newStartDate(until_datetime)}`,
          },
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
      });

      const getListProduct = await ProductModel.findAll();

      const getListCaraBayar = await CaraBayarModel.findAll();

      const getListCategory = await CategoryModel.findAll();
      const getListCustomer = await CabangModel.findAll();

      const newListDetailTransaksi = listDetailTransaksi
        ?.map((item) => ({
          ...item.dataValues,
          transaksi_info: listTransaksi?.find(
            (find) => find?.id == item?.dataValues?.transaksiCabangId
          ),
        }))
        .filter(
          (filter) => filter.transaksi_info.transaksi_status === "CREDIT"
        );

      const customer = getListCustomer.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) => item?.dataValues?.id == filter?.transaksi_info?.cabangId
        ),
      }));

      const payment_method1 = getListCaraBayar?.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) =>
            item?.dataValues.cara_bayar_name ==
            filter?.transaksi_info?.payment_method1
        ),
      }));

      const categoryProduct = getListCategory?.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) => item?.dataValues?.id === filter?.product?.categoryId
        ),
      }));

      const product = getListProduct?.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) => item?.dataValues?.id === filter?.product?.id
        ),
      }));

      const newData = {
        customer,
        caraBayar: payment_method1,
        categoryProduct,
        product,
      };

      responseJSON({
        res,
        status: 200,
        data: cabangId
          ? newData.customer?.filter((filter) =>
              cabangId ? filter?.id == cabangId : filter
            )
          : categoryId
          ? newData.categoryProduct?.filter((filter) =>
              categoryId ? filter?.id == categoryId : filter
            )
          : productId
          ? newData.product?.filter((filter) =>
              productId ? filter?.id == productId : filter
            )
          : paymentMethod
          ? newData.caraBayar?.filter((filter) =>
              paymentMethod ? filter?.id == paymentMethod : filter
            )
          : newData,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error.message });
    }
  };

  getListTransaksiDP = async (req, res) => {
    const {
      from_datetime,
      until_datetime,
      customerId,
      categoryId,
      productId,
      paymentMethod,
    } = req.query;

    try {
      const listTransaksi = await TransaksiModel.findAll({
        transaksi_status: "DP",
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

      const listDetailTransaksi = await TransaksiDetailModel.findAll({
        where: {
          createdAt: {
            [Op.gte]: `${midNight(from_datetime)}`,
            [Op.lte]: `${newStartDate(until_datetime)}`,
          },
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
      });

      const getListProduct = await ProductModel.findAll();

      const getListCaraBayar = await CaraBayarModel.findAll();

      const getListCategory = await CategoryModel.findAll();
      const getListCustomer = await CustomerModel.findAll();

      const newListDetailTransaksi = listDetailTransaksi
        ?.map((item) => ({
          ...item.dataValues,
          transaksi_info: listTransaksi?.find(
            (find) => find?.id == item?.dataValues?.transaksiId
          ),
        }))
        .filter((filter) => filter.transaksi_info.transaksi_status === "DP");

      const customer = getListCustomer.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) => item?.dataValues?.id == filter?.transaksi_info?.customerId
        ),
      }));

      const payment_method1 = getListCaraBayar?.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) =>
            item?.dataValues.cara_bayar_name ==
            filter?.transaksi_info?.payment_method1
        ),
      }));

      const categoryProduct = getListCategory?.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) => item?.dataValues?.id === filter?.product?.categoryId
        ),
      }));

      const product = getListProduct?.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) => item?.dataValues?.id === filter?.product?.id
        ),
      }));

      const newData = {
        customer,
        caraBayar: payment_method1,
        categoryProduct,
        product,
      };

      responseJSON({
        res,
        status: 200,
        data: customerId
          ? newData.customer?.filter((filter) =>
              customerId ? filter?.id == customerId : filter
            )
          : categoryId
          ? newData.categoryProduct?.filter((filter) =>
              categoryId ? filter?.id == categoryId : filter
            )
          : productId
          ? newData.product?.filter((filter) =>
              productId ? filter?.id == productId : filter
            )
          : paymentMethod
          ? newData.caraBayar?.filter((filter) =>
              paymentMethod ? filter?.id == paymentMethod : filter
            )
          : newData,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error.message });
    }
  };

  getListTransaksi = async (req, res) => {
    const {
      from_datetime,
      until_datetime,
      customerId,
      categoryId,
      productId,
      paymentMethod,
    } = req.query;

    try {
      const listTransaksi = await TransaksiModel.findAll({
        transaksi_status: "COMPLETE",
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

      const listDetailTransaksi = await TransaksiDetailModel.findAll({
        where: {
          createdAt: {
            [Op.gte]: `${midNight(from_datetime)}`,
            [Op.lte]: `${newStartDate(until_datetime)}`,
          },
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
      });

      const getListProduct = await ProductModel.findAll();

      const getListCaraBayar = await CaraBayarModel.findAll();

      const getListCategory = await CategoryModel.findAll();
      const getListCustomer = await CustomerModel.findAll();

      const newListDetailTransaksi = listDetailTransaksi
        ?.map((item) => ({
          ...item.dataValues,
          transaksi_info: listTransaksi?.find(
            (find) => find?.id == item?.dataValues?.transaksiId
          ),
        }))
        .filter(
          (filter) => filter.transaksi_info.transaksi_status === "COMPLETE"
        );

      const customer = getListCustomer.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) => item?.dataValues?.id == filter?.transaksi_info?.customerId
        ),
      }));

      const payment_method1 = getListCaraBayar?.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) =>
            item?.dataValues.cara_bayar_name ==
            filter?.transaksi_info?.payment_method1
        ),
      }));

      const categoryProduct = getListCategory?.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) => item?.dataValues?.id === filter?.product?.categoryId
        ),
      }));

      const product = getListProduct?.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) => item?.dataValues?.id === filter?.product?.id
        ),
      }));

      const newData = {
        customer,
        caraBayar: payment_method1,
        categoryProduct,
        product,
      };

      responseJSON({
        res,
        status: 200,
        data: customerId
          ? newData.customer?.filter((filter) =>
              customerId ? filter?.id == customerId : filter
            )
          : categoryId
          ? newData.categoryProduct?.filter((filter) =>
              categoryId ? filter?.id == categoryId : filter
            )
          : productId
          ? newData.product?.filter((filter) =>
              productId ? filter?.id == productId : filter
            )
          : paymentMethod
          ? newData.caraBayar?.filter((filter) =>
              paymentMethod ? filter?.id == paymentMethod : filter
            )
          : newData,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error.message });
    }
  };
  getListProductByCategory = async (req, res) => {
    const { categoryId } = req.body;

    try {
      const getListProductByCategory = await ProductModel.findAll({
        where: {
          categoryId: {
            [Op.like]: `%${categoryId ?? "*"}%`,
          },
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

        order: [["id", "DESC"]],
      });

      responseJSON({ res, status: 200, data: getListProductByCategory });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
  getListProductAll = async (req, res) => {
    try {
      const getListCategory = await CategoryModel.findAll();
      const getListProductAll = await ProductModel.findAll({
        include: [
          {
            model: CategoryModel,
            as: "category",
            attributes: {
              exclude: ["uuid", "createdAt", "updatedAt"],
            },
          },
        ],
        order: [["id", "DESC"]],
      });
      // const newGetListProductAllCategory = getListCategory?.map((item) => ({
      //   id: item.id,
      //   category_name: item.category_name,
      //   listProduct: ,
      // }));
      responseJSON({ res, status: 200, data: getListProductAll });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
  getListBeli = async (req, res) => {
    const { from_datetime, until_datetime, supplierId, productId } = req.query;

    try {
      const listBeli = await BeliModel.findAll({
        include: [
          {
            model: SupplierModel,
            as: "supplier",
            attributes: {
              exclude: ["uuid", "createdAt", "updatedAt"],
            },
          },
        ],
      });

      const listDetailBeli = await BeliDetailModel.findAll({
        where: {
          createdAt: {
            [Op.gte]: `${midNight(from_datetime)}`,
            [Op.lte]: `${newStartDate(until_datetime)}`,
          },
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
      });

      const getListProduct = await ProductModel.findAll();
      const getListCategory = await CategoryModel.findAll();
      const getListSupplier = await SupplierModel.findAll();

      const newListBeli = listDetailBeli?.map((item) => ({
        ...item.dataValues,
        beli_info: listBeli?.find(
          (find) => find?.id == item?.dataValues?.beliId
        ),
      }));

      const supplier = getListSupplier.map((item) => ({
        ...item.dataValues,
        listBeli: newListBeli?.filter(
          (filter) => item?.dataValues.id == filter?.beli_info?.supplierId
        ),
      }));

      const categoryProduct = getListCategory?.map((item) => ({
        ...item.dataValues,
        listBeli: newListBeli?.filter(
          (filter) => item?.dataValues?.id === filter?.product?.categoryId
        ),
      }));

      const product = getListProduct?.map((item) => ({
        ...item.dataValues,
        listBeli: newListBeli?.filter(
          (filter) => item?.dataValues?.id == filter?.productId
        ),
      }));

      const newData = {
        supplier,
        categoryProduct,
        product,
      };
      responseJSON({
        res,
        status: 200,
        data: supplierId
          ? newData.supplier?.filter(
              (filter) => filter?.id == supplierId ?? filter
            )
          : productId
          ? newData.product?.filter(
              (filter) => filter?.id == productId ?? filter
            )
          : newData,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error.message });
    }
  };

  geListKwitansi = async (req, res) => {
    const { from_datetime, until_datetime } = req.query;
    try {
      const listKwitansi = await KwitansiModel.findAll({
        where: {
          createdAt: {
            [Op.gte]: `${midNight(from_datetime)}`,
            [Op.lte]: `${newStartDate(until_datetime)}`,
          },
        },
      });
      responseJSON({ res, status: 200, data: listKwitansi });
    } catch (error) {
      responseJSON({ res, status: 500, data: error.message });
    }
  };

  getListPengeluaran = async (req, res) => {
    const { from_datetime, until_datetime } = req.query;
    try {
      const listPengeluaran = await PengeluaranModel.findAll({
        where: {
          createdAt: {
            [Op.gte]: `${midNight(from_datetime)}`,
            [Op.lte]: `${newStartDate(until_datetime)}`,
          },
        },
      });
      responseJSON({ res, status: 200, data: listPengeluaran });
    } catch (error) {
      responseJSON({ res, status: 500, data: error.message });
    }
  };

  getListresumeKeuangan = async (req, res) => {
    const { from_datetime, until_datetime } = req.query;
    try {
      const getListTransaksi = await TransaksiModel.findAll({
        where: {
          createdAt: {
            [Op.gte]: `${midNight(from_datetime)}`,
            [Op.lte]: `${newStartDate(until_datetime)}`,
          },
        },
      });

      // const getListTransaksiCabang = await TransaksiCabangModel.findAll({
      //   where: {
      //     transaksi_status: "COMPLETE",
      //     createdAt: {
      //       [Op.gte]: `${midNight(from_datetime)}`,
      //       [Op.lte]: `${newStartDate(until_datetime)}`,
      //     },
      //   },
      // });

      const getListCaraBayar = await CaraBayarModel.findAll();

      const getListPengeluaran = await PengeluaranModel.findAll({
        where: {
          createdAt: {
            [Op.gte]: `${midNight(from_datetime)}`,
            [Op.lte]: `${newStartDate(until_datetime)}`,
          },
        },
      });

      const payment1 = (item) =>
        getListTransaksi
          .filter(
            (filter) =>
              filter.dataValues.payment_method1.toLowerCase() ===
              item.dataValues.cara_bayar_name.toLowerCase()
          )
          .filter(
            (filter) =>
              filter.dataValues.transaksi_status === "COMPLETE" ||
              filter.dataValues.transaksi_status === "DP"
          )
          .map((item) => item.dataValues.uang1)
          .reduce((prev, curr) => prev + curr, 0);

      const payment2 = (item) =>
        getListTransaksi
          .filter(
            (filter) =>
              filter.dataValues.payment_method2.toLowerCase() ===
              item.dataValues.cara_bayar_name.toLowerCase()
          )
          .filter(
            (filter) =>
              filter.dataValues.transaksi_status === "COMPLETE" ||
              filter.dataValues.transaksi_status === "DP"
          )
          .map((item) => item.dataValues.uang2)
          .reduce((prev, curr) => prev + curr, 0);

      const newData = {
        pengeluaran: getListPengeluaran.reduce(
          (prev, curr) => prev + parseInt(curr.dataValues.amount),
          0
        ),

        transaksi: getListCaraBayar.map((item) => ({
          ...item.dataValues,
          payment1: payment1(item),
          payment2: payment2(item),
          totalTransaksi: payment1(item) + payment2(item),
        })),
      };

      responseJSON({
        res,
        status: 200,
        data: newData,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error.message });
    }
  };
}
module.exports = new ControllerReport();
