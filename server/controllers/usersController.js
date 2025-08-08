import bcrypt from "bcrypt";
import pool from "../database/db.js";

// NEW USER REGISTER
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Empty fields check
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    if (/\s/.test(username) || /\s/.test(password)) {
      return res.status(400).json({ error: "No spaces allowed" });
    }

    // User exists? check
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hashing with bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // inserting new user into db
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);

    return res.status(201).json({ message: "User registered succesfully" });
  } catch (err) {
    console.error("Registration error:", err);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Server error" });
    }
  }
};

// USER LOG IN
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    if (/\s/.test(username) || /\s/.test(password)) {
      return res.status(400).json({ error: "No spaces allowed" });
    }

    // User exists? check
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = result.rows[0];

    // Comparing the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    //User id in session for saving login
    req.session.userId = user.id;
    req.session.username = user.username;

    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ error: "Session error" });
      }
      console.log("User logged in:", req.session);
      return res.json({
        message: "Login succsesfull",
        user: { id: user.id, username: user.username },
      });
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// CHECKING AUTHENTICATION
export const isAuthenticated = (req, res, next) => {
  try {
    if (req.session && req.session.userId) {
      return res.json(req.session.userId);
    } else {
      console.warn(`Unauthorized access attempt at ${new Date().toISOString}`);
      return res.status(403).json({ error: "Not authenticated" });
    }
  } catch (error) {
    console.error("Auth check error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
