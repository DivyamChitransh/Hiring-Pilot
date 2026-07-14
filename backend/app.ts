import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db";
import { initializeDatabase } from "./database/init";
import authRoutes from "./routes/auth.routes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT

const startServer = async () => {
  try {

    const connection = await db.getConnection();
    console.log("Database Connected Successfully");
    connection.release();

    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {

    console.error("Database Connection Failed");
    console.error(error);
  }
};

startServer();