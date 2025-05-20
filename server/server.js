//Imports
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import cors from "cors";

import commentsRoutes from "./routes/commentsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import gamesRoutes from "./routes/gamesRoutes.js";
import favouritesRoutes from "./routes/favoritesRoutes.js";

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/favourites", favouritesRoutes);

app.use(express.static(path.join(__dirname, "../client/dist")));

// Fallback route for React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// app listen
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
