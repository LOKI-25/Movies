import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

// CREATE
router.post("/", createCustomer);

// UPDATE
router.put("/:id", updateCustomer);

// DELETE
router.delete("/:id", deleteCustomer);

// GET
router.get("/:id", getCustomer);

// GET ALL
router.get("/", getCustomers);

export default router;
