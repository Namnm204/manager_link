import mongoose from "mongoose";

// Kết nối với MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("Kết nối MongoDB thành công!");
  } catch (error) {
    console.error("Kết nối MongoDB thất bại:", error);
  }
};
