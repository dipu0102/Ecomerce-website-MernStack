import expressAsyncHandler from "express-async-handler";
import { Product } from "../models/productModel.js";

//create product
export const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: true,
      data: newProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get All products
export const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    console.log("get All products");
    const Products = await Product.find();
    console.log(Products);
    res.status(200).json({
      status: true,
      data: Products,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get Product
export const getProductBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//Update product
export const updateProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete Product
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).json({
      status: true,
      message: "Product Deleted successfully",
      data: product,
    });
  } catch (error) {
    throw new Error(error);
  }
});
