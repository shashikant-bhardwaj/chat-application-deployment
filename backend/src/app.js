import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

const __dirname = path.resolve();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", messageRouter);


// Serve frontend
app.use(express.static(path.join(__dirname, "frontend/dist")));


// React frontend fallback
app.get("/{*splat}", (req, res) => {
  res.sendFile(
    path.join(__dirname, "frontend/dist/index.html")
  );
});


// Error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

export { app };
