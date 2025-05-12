import express from "express";
import {
  addFavourite,
  removeFavourite,
  getFavourites,
} from "../controllers/favoritesController.js";
import { isAuthenticated } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getFavourites, isAuthenticated);
router.post("/", addFavourite, isAuthenticated);
router.delete("/:id", removeFavourite, isAuthenticated);

export default router;
