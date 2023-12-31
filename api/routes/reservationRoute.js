import express from "express";
import {
  createReservation,
  deleteReservation,
  getReservation,
  getReservations,
  updateReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

// CREATE
router.post("/", createReservation);

// UPDATE
router.put("/:id", updateReservation);

// DELETE
router.delete("/:id", deleteReservation);

// GET
router.get("/:id", getReservation);

// GET ALL
router.get("/", getReservations);

export default router;
