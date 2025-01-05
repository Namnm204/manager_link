import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { addLink, getLinks, deleteLink } from "../api/api"; // Thêm deleteLink vào import
import { toast, ToastContainer } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS của toastify

const AddLink = () => {
  const [links, setLinks] = useState([]); // Khởi tạo links là một mảng rỗng
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Lấy danh sách link khi component mount
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await getLinks(); // Gọi API để lấy danh sách link
        // Sắp xếp theo thứ tự từ mới nhất đến cũ nhất
        const sortedLinks = response?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLinks(sortedLinks || []); // Đảm bảo links luôn là mảng
      } catch (error) {
        toast.error("Có lỗi khi lấy danh sách link.");
      }
    };
    fetchLinks();
  }, []);

  const onSubmit = async (data) => {
    try {
      // Thêm link mới
      await addLink(data.url);
      reset(); // Reset form sau khi gửi
      toast.success("Link đã được thêm thành công!");

      // Cập nhật lại danh sách link sau khi thêm mới
      const response = await getLinks();
      const sortedLinks = response?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setLinks(sortedLinks || []);
    } catch (error) {
      toast.error("Có lỗi khi thêm link.");
    }
  };

  const handleLinkClick = async (linkId, url) => {
    // Xóa link sau khi nhấp vào
    setTimeout(async () => {
      try {
        await deleteLink(linkId); // Gọi API xóa link
        // Cập nhật lại danh sách link sau khi xóa
        const updatedLinks = links.filter((link) => link._id !== linkId);
        setLinks(updatedLinks);
        toast.success("Link đã bị xóa.");

        // Mở link trong cùng tab (nếu bạn không muốn mở trong tab mới)
        window.location.href = url; // Điều hướng đến URL trong cùng tab
      } catch (error) {
        toast.error("Có lỗi khi xóa link.");
      }
    }, 1000); // Delay 1 giây trước khi xóa
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Thêm Link</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="url"
            {...register("url", { required: "URL không được để trống." })}
            placeholder="Nhập URL"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.url && (
            <p className="text-red-500 text-sm">{errors.url.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition duration-300 ease-in-out"
        >
          Thêm Link
        </button>
      </form>

      <h3 className="text-2xl font-semibold mt-8 mb-4">Danh sách Link</h3>
      <div className="space-y-3">
        {Array.isArray(links) && links.length > 0 ? (
          links.map((link) => (
            <div key={link._id} className="flex items-center space-x-3">
              <a
                href="#"
                onClick={() => handleLinkClick(link._id, link.url)} // Gọi handleLinkClick khi click vào link
                className="w-full bg-blue-600 text-white py-3 px-5 rounded-md text-center font-semibold hover:bg-blue-800 transition duration-300 ease-in-out"
              >
                {link.url}
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Không có link nào.</p>
        )}
      </div>

      {/* Đặt ToastContainer ở cuối để chứa thông báo */}
      <ToastContainer />
    </div>
  );
};

export default AddLink;
