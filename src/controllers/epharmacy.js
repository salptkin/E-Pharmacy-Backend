import { reviews } from "../models/reviews.js";
import { NearestStore } from "../models/nearestStores.js";
import { Product } from "../models/products.js";
import { Store } from "../models/stores.js";
import ctrlWrapper from "../services/ctrlWrapper.js";
import httpError from "../services/httpError.js";

const getAllStores = async (req, res) => {
  const { limit = 9 } = req.query;
  let filter = {};
  const result = await Store.find(filter).sort({ name: 1 }).limit(Number(limit));
  res.json(result);
};

const getNearestStores = async (req, res) => {
  const { limit = 6 } = req.query;
  let filter = {};
  const result = await NearestStore.find(filter).limit(Number(limit));
  res.json(result);
};

const getReviews = async (req, res) => {
  const { limit = 3 } = req.query;
  let filter = {};
  const result = await reviews.find(filter).limit(Number(limit));
  res.json(result);
};

const getAllProducts = async (req, res) => {
  const { category, name, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;
  let filter = {};
  if (category) {
    filter.category = category;
  }
  if (name) {
    filter.name = { $regex: new RegExp(name, "i") };
  }

  const totalProducts = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalProducts / limit);

  const result = await Product.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  if (result.length === 0) {
    throw httpError(404, "Not found");
  }
  res.json({
    currentPage: Number(page),
    totalPages: totalPages,
    totalProducts: totalProducts,
    products: result,
  });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findById(id);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

export default {
  getAllStores: ctrlWrapper(getAllStores),
  getNearestStores: ctrlWrapper(getNearestStores),
  getReviews: ctrlWrapper(getReviews),
  getAllProducts: ctrlWrapper(getAllProducts),
  getProductById: ctrlWrapper(getProductById),
};