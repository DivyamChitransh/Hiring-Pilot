import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT

const startServer = async () => {
  try {

    const connection = await db.getConnection();
    console.log("Database Connected Successfully");
    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    
    console.error("Database Connection Failed");
    console.error(error);
  }
};

startServer();