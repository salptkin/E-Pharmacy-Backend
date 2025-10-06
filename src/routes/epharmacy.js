import express from "express";

const router = express.Router();

import ctrl from "../controllers/epharmacy.js";

router.get("/stores", ctrl.getAllStores);

router.get("/stores/nearest", ctrl.getNearestStores);

router.get("/customer-reviews", ctrl.getReviews);

router.get("/products", ctrl.getAllProducts);

router.get("/products/:id", ctrl.getProductById);

export default router;