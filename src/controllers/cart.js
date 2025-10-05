import mongoose from "mongoose";
import { Cart } from "../models/cart.js";
import { Product } from "../models/products.js";
import { User } from "../models/users.js";
import ctrlWrapper from "../services/ctrlWrapper.js";
import httpError from "../services/httpError.js";

const getCartItems = async (req, res) => {
  const { _id: userId } = req.user;

  if (!userId) {
    throw httpError(400, "User id is required");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw httpError(404, "User not found");
  }

  let cart = await Cart.findOne({ userId }).populate({
    path: "products.productId",
    model: "product",
  });

  if (!cart) {
    cart = await Cart.create({ userId, products: [] });
    user.cart = cart._id;
    await user.save();
  }

  const cartProducts = cart && cart.products ? cart.products : [];

  let total = 0;
  for (const item of cartProducts) {
    const product = item.productId;
    if (!product) {
      continue;
    }
    total += product.price * item.quantity;
  }

  await Cart.findOneAndUpdate(
    { userId },
    { total: total.toFixed(2) },
    { new: true }
  );

  res.json({ 
    cartProducts, 
    total,
    isOrdered: cart.isOrdered,
    checkoutInfo: cart.isOrdered ? {
      name: cart.name,
      email: cart.email,
      phone: cart.phone,
      address: cart.address,
      payment: cart.payment
    } : null
  });
};

const updateCart = async (req, res) => {
  const { _id: userId } = req.user;

  if (!userId) {
    throw httpError(400, "User id is required");
  }

  const { products } = req.body;

  if (!products || !Array.isArray(products)) {
    throw httpError(400, "Products array is required");
  }

  let cart = await Cart.findOne({ userId });

  let total = 0;
  const updatedProducts = [];

  for (const item of products) {
    const { productId, quantity } = item;
    const product = await Product.findById(productId);
    if (!product) {
      throw httpError(404, `Product with id ${productId} not found`);
    }
    updatedProducts.push({ productId, quantity });
    total += product.price * quantity;
  }

  cart = await Cart.findOneAndUpdate(
    { userId },
    { products: updatedProducts, total: total.toFixed(2) },
    { new: true }
  );

  if (!cart) {
    throw httpError(404, "Cart not found");
  }

  await User.findByIdAndUpdate(userId, { cart: cart._id }, { new: true });

  res.status(200).json(cart);
};

const cartCheckout = async (req, res) => {
  const { _id: userId } = req.user;
  const { name, email, phone, address, payment } = req.body;
  const result = await Cart.findOneAndUpdate(
    { userId },
    { name, email, phone, address, payment, isOrdered: true },
    { new: true }
  );
  res.status(200).json(result);
};

const addToCart = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId, quantity } = req.body;

  if (!userId) {
    throw httpError(400, "User id is required");
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      products: [{ productId, quantity }],
    });
  } else {
    const existingProduct = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({
        productId,
        quantity,
      });
    }
  }

  await cart.save();

  res.status(200).json(cart);
};

const decreaseQuantity = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId, quantity } = req.body;

  if (!userId) {
    throw httpError(400, "User id is required");
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      products: [{ productId, quantity }],
    });
  } else {
    const existingProduct = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    console.log(existingProduct);

    if (existingProduct.quantity === 1) {
      const updatedProducts = cart.products.filter(
        (product) => product.productId.toString() !== productId
      );
      cart.products = updatedProducts;
    } else {
      existingProduct.quantity -= 1;
    }
  }

  await cart.save();

  res.status(200).json(cart);
};

const deleteFromCart = async (req, res) => {
  const { _id: userId } = req.user;
  const { productId } = req.params;

  if (!userId) {
    throw httpError(400, "User id is required");
  }

  if (!productId) {
    throw httpError(400, "Product id is required");
  }

  let cart = await Cart.findOne({ userId });

  const searchedProduct = cart.products.find(
    (product) => product.productId.toString() === productId
  );

  if (!searchedProduct) {
    throw httpError(404, "There is no product with this id in the cart");
  }

  const newProducts = cart.products.filter(
    (product) => product.productId.toString() !== productId
  );

  cart = await Cart.findOneAndUpdate(
    { userId },
    { products: newProducts },
    { new: true }
  );

  res.status(200).json(cart);
};

export default {
  getCartItems: ctrlWrapper(getCartItems),
  updateCart: ctrlWrapper(updateCart),
  cartCheckout: ctrlWrapper(cartCheckout),
  addToCart: ctrlWrapper(addToCart),
  decreaseQuantity: ctrlWrapper(decreaseQuantity),
  deleteFromCart: ctrlWrapper(deleteFromCart),
};