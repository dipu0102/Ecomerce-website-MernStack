import expressAsyncHandler from "express-async-handler";
import { SubCategory } from "../models/subCategoryModel.js";
//create subcategory
export const createSubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newSubCategory = await SubCategory.create(req.body);
    res.status(201).json({
      status: true,
      data: newSubCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get All subcategorys
export const getAllSubCategorys = expressAsyncHandler(async (req, res) => {
  try {
    console.log("get All subcategorys");
    const SubCategorys = await SubCategory.find();
    console.log(SubCategorys);
    res.status(200).json({
      status: true,
      data: SubCategorys,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get SubCategory
export const getSubCategoryBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const subcategory = await SubCategory.findOne({ slug: req.params.slug });
    res.status(200).json({
      status: true,
      data: subcategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//Update subcategory
export const updateSubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const subcategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!subcategory) {
      throw new Error("SubCategory not found");
    }
    res.status(200).json({
      status: true,
      data: subcategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete SubCategory
export const deleteSubCategory = expressAsyncHandler(async (req, res) => {
  try {
    const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subcategory) {
      throw new Error("SubCategory not found");
    }
    res.status(200).json({
      status: true,
      message: "SubCategory Deleted successfully",
      data: SubCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});
