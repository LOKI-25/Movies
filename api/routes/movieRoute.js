import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  searchMovie,
  updateMovie,
} from "../controllers/movieController.js";

const router = express.Router();

// CREATE
router.post("/", createMovie);

// UPDATE
router.put("/:id", updateMovie);

// DELETE
router.delete("/:id", deleteMovie);

// GET
router.get("/:id", getMovie);

// GET ALL
router.get("/", getMovies);

router.get("/:id/shows", searchMovie);

export default router;
