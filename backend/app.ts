import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db";
import { initializeDatabase } from "./database/init";
import authRoutes from "./routes/auth.routes";
import companyRoutes from "./routes/company.routes";
import uploadRoutes from "./routes/upload.routes";
import jobsRoutes from "./routes/jobs.routes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/company", companyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/job", jobsRoutes);


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