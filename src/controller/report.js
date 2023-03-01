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
    const { from_datetime, until_datetime, cabangId, categoryId, productId } =
      req.query;

    try {
      const listTransaksi = await TransaksiCabangModel.findAll({
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

      const getListCategory = await CategoryModel.findAll();
      const getListCabang = await CabangModel.findAll();

      const newListDetailTransaksi = listDetailTransaksi?.map((item) => ({
        ...item.dataValues,
        transaksi_info: listTransaksi?.find(
          (find) => find?.id == item?.dataValues?.transaksiCabangId
        ),
      }));

      const cabang = getListCabang.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) => item?.dataValues.id == filter?.transaksi_info?.cabangId
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
        cabang,
        categoryProduct,
        product,
      };
      responseJSON({
        res,
        status: 200,
        data: cabangId
          ? newData.cabang?.filter((filter) => filter?.id == cabangId)
          : categoryId
          ? newData.categoryProduct?.filter(
              (filter) => filter?.id == categoryId
            )
          : productId
          ? newData.product?.filter((filter) => filter?.id == productId)
          : newData,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error.message });
    }
  };

  getListTransaksiDP = async (req, res) => {
    const { from_datetime, until_datetime, customerId, categoryId, productId } =
      req.query;

    try {
      const listTransaksi = await TransaksiModel.findAll({
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

      const getListCategory = await CategoryModel.findAll();
      const getListCustomer = await CustomerModel.findAll();

      const newListDetailTransaksi = listDetailTransaksi?.map((item) => ({
        ...item.dataValues,
        transaksi_info: listTransaksi?.find(
          (find) => find?.id == item?.dataValues?.transaksiId
        ),
      }));

      const customer = getListCustomer.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) =>
            item?.dataValues.id == filter?.transaksi_info?.customerId &&
            filter?.transaksi_info?.transaksi_status === "DP"
        ),
      }));

      const categoryProduct = getListCategory?.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) =>
            item?.dataValues?.id === filter?.product?.categoryId &&
            filter?.transaksi_info?.transaksi_status === "DP"
        ),
      }));

      const product = getListProduct?.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) =>
            item?.dataValues?.id === filter?.product?.id &&
            filter?.transaksi_info?.transaksi_status === "DP"
        ),
      }));

      const newData = {
        customer,
        categoryProduct,
        product,
      };

      responseJSON({
        res,
        status: 200,
        data: customerId
          ? newData.customer?.filter((filter) => filter?.id == customerId)
          : categoryId
          ? newData.categoryProduct?.filter(
              (filter) => filter?.id == categoryId
            )
          : productId
          ? newData.product?.filter((filter) => filter?.id == productId)
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

      const newListDetailTransaksi = listDetailTransaksi?.map((item) => ({
        ...item.dataValues,
        transaksi_info: listTransaksi?.find(
          (find) => find?.id == item?.dataValues?.transaksiId
        ),
      }));

      const customer = getListCustomer.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) => item?.dataValues.id == filter?.transaksi_info?.customerId
        ),
      }));

      const payment_method1 = getListCaraBayar?.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) =>
            item?.dataValues.cara_bayar_name.toLowerCase() ===
            filter?.transaksi_info?.payment_method1.toLowerCase()
        ),
      }));

      const payment_method2 = getListCaraBayar?.map((item) => ({
        ...item.dataValues,
        listTransaksi: newListDetailTransaksi?.filter(
          (filter) =>
            item?.dataValues.cara_bayar_name.toLowerCase() ===
            filter?.transaksi_info?.payment_method2.toLowerCase()
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
        caraBayar: {
          payment_method1,
          payment_method2,
        },
        categoryProduct,
        product,
      };

      responseJSON({
        res,
        status: 200,
        data: customerId
          ? newData.customer?.filter((filter) => filter?.id == customerId)
          : categoryId
          ? newData.categoryProduct?.filter(
              (filter) => filter?.id == categoryId
            )
          : productId
          ? newData.product?.filter((filter) => filter?.id == productId)
          : paymentMethod
          ? newData.caraBayar.payment_method1?.filter(
              (filter) => filter?.id == paymentMethod
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
      const newGetListProductAllCategory = getListCategory?.map((item) => ({
        id: item.id,
        category_name: item.category_name,
        listProduct: getListProductAll?.filter(
          (filter) => filter?.categoryId === item.id
        ),
      }));
      responseJSON({ res, status: 200, data: newGetListProductAllCategory });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
    }
  };
}
module.exports = new ControllerReport();
