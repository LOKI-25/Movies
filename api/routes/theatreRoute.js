import express from "express";
import {
  createTheatre,
  deleteTheatre,
  getTheatre,
  getTheatres,
  search,
  updateTheatre,
} from "../controllers/theatreController.js";

const router = express.Router();

// CREATE
router.post("/", createTheatre);

// UPDATE
router.put("/:id", updateTheatre);

// DELETE
router.delete("/:id", deleteTheatre);

// GET
router.get("/find/:id", getTheatre);

// GET ALL
router.get("/", getTheatres);

// Find by criteria
router.get("/search", search);

export default router;
