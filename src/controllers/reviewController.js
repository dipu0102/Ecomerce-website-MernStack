import expressAsyncHandler from "express-async-handler";
import { Review } from "../models/reviewModel.js";

//create review
export const createReview = expressAsyncHandler(async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json({
      status: true,
      data: newReview,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get All reviews
export const getAllReviews = expressAsyncHandler(async (req, res) => {
  try {
    console.log("get All reviews");
    const Reviews = await Review.find();
    console.log(Reviews);
    res.status(200).json({
      status: true,
      data: Reviews,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get Review
export const getReviewById = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      data: review,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//Update review
export const updateReview = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!review) {
      throw new Error("Review not found");
    }
    res.status(200).json({
      status: true,
      data: review,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// delete Review
export const deleteReview = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      throw new Error("Review not found");
    }
    res.status(200).json({
      status: true,
      message: "Review Deleted successfully",
      data: review,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const approveAReview = expressAsyncHandler(async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved: req.body.isApproved },
      { new: true }
    );
    if (!review) {
      throw new Error("Review not found");
    }
    res.status(200).json({
      status: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    throw new Error(error);
  }
});
