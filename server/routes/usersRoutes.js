import express from "express";
import {
  isAuthenticated,
  loginUser,
  registerUser,
} from "../controllers/usersController.js";

const router = express.Router();

// Users apps
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", (req, res) => {
  if (!req.session.userId) {
    return res.status(403).json({ error: "Not logged in" });
  }

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed " });
    }
    res.json({ message: "Logged out succsessfully" });
  });
});
router.post("/isauthenticated", isAuthenticated);

// TESTING SESSION
router.get("/check-session", (req, res) => {
  if (req.session.userId) {
    res.json({
      loggedIn: true,
      userId: req.session.userId,
      username: req.session.username,
    });
  } else {
    res.json({ loggedIn: false });
  }
});

export default router;
