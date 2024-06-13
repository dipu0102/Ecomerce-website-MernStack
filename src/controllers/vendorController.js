import expressAsyncHandler from "express-async-handler";
import { Vendor } from "../models/vendorModel.js";

export const createVendor = expressAsyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const newVendor = await Vendor.create(req.body);
    console.log(newVendor);
    res.status(201).json({
      status: true,
      data: newVendor,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export const getVendors = expressAsyncHandler(async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("user");
    res.status(200).json({ status: true, data: vendors });
  } catch (error) {
    throw new Error(error);
  }
});

export const getVendorBySlug = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ slug: req.params.slug }).populate(
      "user",
      "-password"
    );

    res.status(200).json({ status: true, data: vendor });
  } catch (error) {
    throw new Error(error);
  }
});

export const updateVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(vendor);
    if (!vendor) {
      throw new Error("Vendor not found");
    }

    res.status(200).json({ status: true, data: vendor });
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteVendor = expressAsyncHandler(async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    console.log(vendor);
    if (!vendor) {
      throw new Error("Vendor not found");
    }

    res.status(200).json({ status: true, data: vendor });
  } catch (error) {
    throw new Error(error);
  }
});
