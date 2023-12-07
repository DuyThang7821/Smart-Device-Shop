const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, total, address, status } = req.body;
  if (address) {
    await User.findByIdAndUpdate(_id, { address, cart: [] });
  }
  const data = { products, total, orderBy: _id };
  if (status) data.status = status;
  const rs = await Order.create(data);
  return res.json({
    success: rs ? true : false,
    rs: rs ? rs : "Cannot create new Order",
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing status");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.json({
    success: response ? true : false,
    response: response ? response : "Cannot create new Order",
  });
});

const getUserOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const {_id} = req.user
  // Tach cac truong dac biet ra khoi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // format lai cac operator cho dung cu phap mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  // let colorQueryObject = {};
  // // filtering
  // if (queries?.title)
  //   formatedQueries.title = { $regex: queries.title, $options: "i" };
  // if (queries?.category)
  //   formatedQueries.category = { $regex: queries.category, $options: "i" };
  // if (queries?.color) {
  //   delete formatedQueries.color;
  //   const colorArr = queries.color?.split(",");
  //   const colorQuery = colorArr.map((el) => ({
  //     color: { $regex: el, $options: "i" },
  //   }));
  //   colorQueryObject = { $or: colorQuery };
  // }

  // let queryObject = {};
  // if (queries?.q) {
  //   delete formatedQueries.q;

  //   colorQueryObject = {
  //     $or: [
  //       { color: { $regex: queries.q, $options: "i" } },
  //       { title: { $regex: queries.q, $options: "i" } },
  //       { category: { $regex: queries.q, $options: "i" } },
  //       { brand: { $regex: queries.q, $options: "i" } },
  //       { description: { $regex: queries.q, $options: "i" } },
  //     ],
  //   };
  // }
  const qr = { ...formatedQueries, orderBy: _id };
  let queryCommand = Order.find(qr);

  // sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  // Pagination
  // limit: so object lay ve khi goi API
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  // Excute query
  // so luong san pham thoa man !== so luong sp tra ve 1 lan goi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err?.message);
    const counts = await Order.find(qr).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      orders: response ? response : "Cannot get products",
    });
  });
});

const getOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // Tach cac truong dac biet ra khoi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // format lai cac operator cho dung cu phap mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (macthedEl) => `$${macthedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  // let colorQueryObject = {};
  // // filtering
  // if (queries?.title)
  //   formatedQueries.title = { $regex: queries.title, $options: "i" };
  // if (queries?.category)
  //   formatedQueries.category = { $regex: queries.category, $options: "i" };
  // if (queries?.color) {
  //   delete formatedQueries.color;
  //   const colorArr = queries.color?.split(",");
  //   const colorQuery = colorArr.map((el) => ({
  //     color: { $regex: el, $options: "i" },
  //   }));
  //   colorQueryObject = { $or: colorQuery };
  // }

  // let queryObject = {};
  // if (queries?.q) {
  //   delete formatedQueries.q;

  //   colorQueryObject = {
  //     $or: [
  //       { color: { $regex: queries.q, $options: "i" } },
  //       { title: { $regex: queries.q, $options: "i" } },
  //       { category: { $regex: queries.q, $options: "i" } },
  //       { brand: { $regex: queries.q, $options: "i" } },
  //       { description: { $regex: queries.q, $options: "i" } },
  //     ],
  //   };
  // }
  const qr = { ...formatedQueries };
  let queryCommand = Order.find(qr);

  // sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  // Pagination
  // limit: so object lay ve khi goi API
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  // Excute query
  // so luong san pham thoa man !== so luong sp tra ve 1 lan goi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err?.message);
    const counts = await Order.find(qr).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      orders: response ? response : "Cannot get products",
    });
  });
});
module.exports = {
  createOrder,
  updateStatus,
  getUserOrders,
  getOrders,
};
