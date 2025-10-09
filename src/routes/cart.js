import express from 'express';
import ctrl from '../controllers/cart.js';
import authenticate from '../middlewares/authenticate.js';
import validateBody from '../middlewares/validateBody.js';
import { schemas } from '../models/cart.js';

const router = express.Router();

router.get("/cart", authenticate, ctrl.getCartItems);

router.put(
  "/cart/update",
  authenticate,
  validateBody(schemas.updateCartSchema),
  ctrl.updateCart
);

router.post(
  "/cart/checkout",
  authenticate,
  validateBody(schemas.cartCheckoutSchema),
  ctrl.cartCheckout
);

router.patch(
  "/cart/add",
  authenticate,
  validateBody(schemas.addToCartSchema),
  ctrl.addToCart
);

router.post(
  "/cart/add",
  authenticate,
  validateBody(schemas.addToCartSchema),
  ctrl.addToCart
);

router.put(
  "/cart/decrease",
  authenticate,
  validateBody(schemas.decreaseQuantitySchema),
  ctrl.decreaseQuantity
);

router.delete("/cart/remove/:productId", authenticate, ctrl.deleteFromCart);

export default router;