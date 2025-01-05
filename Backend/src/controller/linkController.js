import { Link } from "../models/Link.js";

// Thêm link mới
export const addLink = async (req, res) => {
  const { url, title } = req.body;

  // Kiểm tra nếu URL không được nhập
  if (!url)
    return res.status(400).json({ message: "URL không được để trống." });

  try {
    // Nếu không có title, sử dụng URL làm title hoặc gán một giá trị mặc định
    const linkTitle = title || "";

    // Tạo mới link với URL và title
    const newLink = await Link.create({
      url,
      title: linkTitle,
    });

    res.status(201).json({ message: "Thêm thành công", link: newLink });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi thêm link.", error: error.message });
  }
};

// Lấy danh sách link
export const getLinks = async (req, res) => {
  const { status = "active" } = req.query;
  try {
    const links = await Link.find({ status });
    res.status(200).json(links);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách link.", error: error.message });
  }
};

// Xóa link vĩnh viễn
export const deleteLink = async (req, res) => {
  const { id } = req.params;
  try {
    // Tìm và xóa link theo ID
    const link = await Link.findByIdAndDelete(id);

    if (!link) {
      return res.status(404).json({ message: "Link không tồn tại." });
    }

    res.status(200).json({ message: "Đã xóa link vĩnh viễn.", link });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa link.",
      error: error.message,
    });
  }
};

// Chuyển link vào thùng rác
export const trashLink = async (req, res) => {
  const { id } = req.params;
  try {
    // Cập nhật link sang trạng thái "trashed" và lưu thời gian xóa
    const link = await Link.findByIdAndUpdate(
      id,
      { status: "trashed", deletedAt: new Date() },
      { new: true }
    );

    if (!link) return res.status(404).json({ message: "Không tìm thấy link." });

    res
      .status(200)
      .json({ message: "Link đã được chuyển vào thùng rác.", link });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xử lý link.",
      error: error.message,
    });
  }
};
