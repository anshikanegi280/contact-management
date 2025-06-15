import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use(json());

app.use("/api/contacts", contactRoutes);

// root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));