import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Thay bằng URL backend của bạn

// Thêm link mới
export const addLink = async (url) => {
  try {
    const response = await axios.post(`${API_URL}/add`, { url });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm link:", error);
    throw error;
  }
};

// Lấy danh sách link
export const getLinks = async () => {
  try {
    const response = await axios.get(`${API_URL}/links`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách link:", error);
    throw error;
  }
};

// Chuyển link vào thùng rác
export const trashLink = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/trash/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi chuyển link vào thùng rác:", error);
    throw error;
  }
};

// Xóa link vĩnh viễn
export const deleteLink = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/link/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa link:", error);
    throw error;
  }
};
