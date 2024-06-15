import expressAsyncHandler from "express-async-handler";
import { Brand } from "../models/brandModel.js";
//create brand
export const createBrand = expressAsyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.status(201).json({
      status: true,
      data: newBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get All brands
export const getAllBrands = expressAsyncHandler(async (req, res) => {
  try {
    console.log("get All brands");
    const Brands = await Brand.find();
    console.log(Brands);
    res.status(200).json({
      status: true,
      data: Brands,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get Brand
export const getBrandBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug });
    res.status(200).json({
      status: true,
      data: brand,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//Update brand
export const updateBrand = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!brand) {
      throw new Error("Brand not found");
    }
    res.status(200).json({
      status: true,
      data: brand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete Brand
export const deleteBrand = expressAsyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      throw new Error("Brand not found");
    }
    res.status(200).json({
      status: true,
      message: "Brand Deleted successfully",
      data: Brand,
    });
  } catch (error) {
    throw new Error(error);
  }
});
