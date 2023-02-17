const AdminRouter = require("./admin");
const TokenRouter = require("./token");
const ProductRouter = require("./product")
const CategoryRouter = require("./category")
const CabangRouter = require("./cabang")
const CustomerRouter = require("./customer")
const CaraBayarRouter = require("./cara_bayar")
const KwitansiRouter = require("./kwitansi")
const PengeluaranRouter = require("./pengeluaran")
const BrokenProductRouter = require("./broken_product")
const SupplierRouter = require("./supplier")
const BeliRouter = require("./beli")
const BeliDetailRouter = require("./beli_detail")
const { base_path } = require("../../utils");

const Routing = (app) => {
  app.use(base_path("admin"), AdminRouter);
  app.use(base_path("token"), TokenRouter);
  app.use(base_path("product"), ProductRouter)
  app.use(base_path("category"), CategoryRouter)
  app.use(base_path("cabang"), CabangRouter)
  app.use(base_path("customer"), CustomerRouter)
  app.use(base_path("cara-bayar"), CaraBayarRouter)
  app.use(base_path("kwitansi"), KwitansiRouter)
  app.use(base_path("pengeluaran"), PengeluaranRouter)
  app.use(base_path("broken-product"), BrokenProductRouter)
  app.use(base_path("supplier"), SupplierRouter)
  app.use(base_path("beli"), BeliRouter)
  app.use(base_path("beli-detail"), BeliDetailRouter)
};

module.exports = Routing;
