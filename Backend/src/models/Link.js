import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    title: { type: String },
    status: { type: String, enum: ["active", "trashed"], default: "active" },
    deletedAt: { type: Date }, // Thời gian chuyển vào thùng rác
  },
  { timestamps: true } // Thêm createdAt và updatedAt
);

export const Link = mongoose.model("Link", linkSchema);
