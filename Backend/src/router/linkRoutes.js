import express from "express";
import {
  addLink,
  deleteLink,
  getLinks,
  trashLink,
} from "../controller/linkController.js";

const router = express.Router();

router.post("/add", addLink); // Thêm link mới
router.get("/links", getLinks); // Lấy danh sách link
router.put("/trash/:id", trashLink); // Chuyển link vào thùng rác
router.delete("/link/:id", deleteLink); //xóa link

export default router;
