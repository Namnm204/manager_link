import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/connectDB.js";
import linkRoutes from "./router/linkRoutes.js";
import cron from "node-cron";
import { Link } from "./models/Link.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Kết nối MongoDB
connectDB();

// Routes
app.use("/api/", linkRoutes);

// Cron job: Xóa các link trong thùng rác sau 2 ngày
cron.schedule("0 0 * * *", async () => {
  // Mỗi ngày lúc 00:00 (có thể điều chỉnh lại theo yêu cầu)
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 2 ngày
  try {
    const result = await Link.deleteMany({
      status: "trashed",
      deletedAt: { $lte: twoDaysAgo },
    });
    console.log(`Đã xóa ${result.deletedCount} link cũ trong thùng rác.`);
  } catch (error) {
    console.error("Lỗi khi xóa link cũ:", error.message);
  }
});

// Khởi chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy trên cổng http://localhost:${PORT}`);
});
