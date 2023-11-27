import express from "express";
import {
  createTicket,
  deleteTicket,
  getTicket,
  getTickets,
  updateTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

// CREATE
router.post("/", createTicket);

// UPDATE
router.put("/:id", updateTicket);

// DELETE
router.delete("/:id", deleteTicket);

// GET
router.get("/:id", getTicket);

// GET ALL
router.get("/", getTickets);

export default router;
