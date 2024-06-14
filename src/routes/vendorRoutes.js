import express from "express";

import {
  createVendor,
  deleteVendor,
  getVendorBySlug,
  getVendors,
  updateVendor,
} from "../controllers/vendorController.js";

const vendorRouter = express.Router();

//create a vendor route
vendorRouter.post("/", createVendor);
//get all vendors
vendorRouter.get("/all", getVendors);
// get vendor by slug
vendorRouter.get("/:slug", getVendorBySlug);
// update vendor by id
vendorRouter.put("/:id", updateVendor);
// delete   vendor by id
vendorRouter.delete("/:id", deleteVendor);

export default vendorRouter;
