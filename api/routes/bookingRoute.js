import express from "express";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

// CREATE
router.post("/", createBooking);

// UPDATE

// DELETE
router.delete("/:id", deleteBooking);

// GET
router.get("/:id", getBooking);

// GET ALL
router.get("/", getBookings);

export default router;
