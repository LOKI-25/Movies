import express from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// CREATE
router.post("/", createAdmin);

// UPDATE
router.put("/:id", updateAdmin);

// DELETE
router.delete("/:id", deleteAdmin);

// GET
router.get("/:id", getAdmin);

// GET ALL
router.get("/", getAdmins);

export default router;
