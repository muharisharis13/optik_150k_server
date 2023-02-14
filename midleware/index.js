const { AdminModel } = require("../src/models");
const { hashPassword } = require("../utils");

const Middleware = ({ app, bodyParser, cors, express }) => {
  app.use(cors());
  app.options("*", cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // file static upload

  app.use("/view/images", express.static("./uploads/img"));
};

module.exports = Middleware;
