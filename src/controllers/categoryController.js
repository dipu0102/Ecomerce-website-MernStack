import expressAsyncHandler from "express-async-handler";
import { Category } from "../models/categoryModel.js";
//create category
export const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({
      status: true,
      data: newCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get All categorys
export const getAllCategorys = expressAsyncHandler(async (req, res) => {
  try {
    console.log("get All categorys");
    const Categorys = await Category.find();
    console.log(Categorys);
    res.status(200).json({
      status: true,
      data: Categorys,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get Category
export const getCategoryBySlug = expressAsyncHandler(async (req, res) => {
  try {
    console.log("slug");
    const category = await Category.findOne({ slug: req.params.slug });
    console.log(category);
    res.status(200).json({
      status: true,
      data: category,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//Update category
export const updateCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      throw new Error("Category not found");
    }
    res.status(200).json({
      status: true,
      data: category,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete Category
export const deleteCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      throw new Error("Category not found");
    }
    res.status(200).json({
      status: true,
      message: "Category Deleted successfully",
      data: Category,
    });
  } catch (error) {
    throw new Error(error);
  }
});
