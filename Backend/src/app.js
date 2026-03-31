import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import morgan from 'morgan'
import ChatRouter from "./routes/chat.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'))
// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods:['POST' , 'DELETE' , 'GET' ,'PUT']
  })
);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Routes
app.use("/api/auth", authRouter);
app.use('/api/chats',ChatRouter)
export default app;