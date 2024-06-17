import expressAsyncHandler from "express-async-handler";
import { Wishlist } from "../models/wishlistModel.js";
//create wishlist
export const createWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const newWishlist = await Wishlist.create(req.body);
    res.status(201).json({
      status: true,
      data: newWishlist,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get All wishlists
export const getAllWishlists = expressAsyncHandler(async (req, res) => {
  try {
    console.log("get All wishlists");
    const Wishlists = await Wishlist.find();
    console.log(Wishlists);
    res.status(200).json({
      status: true,
      data: Wishlists,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get Wishlist
export const getWishlistBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);
    res.status(200).json({
      status: true,
      data: wishlist,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//Update wishlist
export const updateWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!wishlist) {
      throw new Error("Wishlist not found");
    }
    res.status(200).json({
      status: true,
      data: wishlist,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete Wishlist
export const deleteWishlist = expressAsyncHandler(async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
    if (!wishlist) {
      throw new Error("Wishlist not found");
    }
    res.status(200).json({
      status: true,
      message: "Wishlist Deleted successfully",
      data: Wishlist,
    });
  } catch (error) {
    throw new Error(error);
  }
});
