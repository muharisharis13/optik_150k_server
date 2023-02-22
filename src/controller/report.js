const { responseJSON } = require("../../utils");
const {
  ProductModel,
  CategoryModel,
  TransaksiModel,
  CustomerModel,
  TransaksiDetailModel,
  CaraBayarModel,
} = require("../models");
const { Op , Sequelize} = require("sequelize");

class ControllerReport {
  getListTransaksi = async (req, res) => {
    const { from_datetime, until_datetime } = req.query;
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

      const newListDetailTransaksi = listDetailTransaksi?.filter(filter=>{
        console.log({filter: new Date(from_datetime).getTime()  <= new Date(filter.dataValues.createdAt).getTime() && new Date(filter.dataValues.createdAt).getTime() <=  new Date(until_datetime).getTime()  })
        // var time = new Date(d.released_on).getTime();
        //                      return (sd < time && time < ed);
                            
      } )?.map((item) => ({
        ...item.dataValues,
        transaksi_info: listTransaksi?.find(
          (find) => find?.id == item?.dataValues?.transaksiId
        ),
      }));

      const newData = {
        customer: newListDetailTransaksi,
        caraBayar: {
          payment_method1: getListCaraBayar?.map((item) => ({
            ...item.dataValues,
            listTransaksi: newListDetailTransaksi?.filter(
              (filter) =>
                item?.dataValues.cara_bayar_name.toLowerCase() ===
                filter?.transaksi_info?.payment_method1.toLowerCase()
            ),
          })),
          payment_method2: getListCaraBayar?.map((item) => ({
            ...item.dataValues,
            listTransaksi: newListDetailTransaksi?.filter(
              (filter) =>
                item?.dataValues.cara_bayar_name.toLowerCase() ===
                filter?.transaksi_info?.payment_method2.toLowerCase()
            ),
          })),
        },
        categoryProduct: getListCategory?.map((item) => ({
          ...item.dataValues,
          listTransaksi: newListDetailTransaksi?.filter(
            (filter) => item?.dataValues?.id === filter?.product?.categoryId
          ),
        })),
        product: getListProduct?.map((item) => ({
          ...item.dataValues,
          listTransaksi: newListDetailTransaksi?.filter(
            (filter) => item?.dataValues?.id === filter?.product?.id
          ),
        })),
      };

      responseJSON({
        res,
        status: 200,
        data: newData,
      });
    } catch (error) {
      responseJSON({ res, status: 500, data: error });
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
        group: ["categoryId", "product_name"],
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
