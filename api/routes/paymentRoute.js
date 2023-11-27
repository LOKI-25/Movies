import express from "express";
import {
  createPayment,
  deletePayment,
  getPayment,
  getPayments,
  updatePayment,
} from "../controllers/paymentController.js";

const router = express.Router();

// CREATE
router.post("/", createPayment);

// UPDATE
router.put("/:id", updatePayment);

// DELETE
router.delete("/:id", deletePayment);

// GET
router.get("/:id", getPayment);

// GET ALL
router.get("/", getPayments);

export default router;
