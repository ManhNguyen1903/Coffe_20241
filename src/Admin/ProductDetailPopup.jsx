import React, { useState, useEffect } from "react";
import "./ProductDetailPopup.css";

const ProductDetailPopup = ({ product, onClose, onUpdate }) => {
  const [editableProduct, setEditableProduct] = useState(null);

  useEffect(() => {
    if (product) {
      setEditableProduct({ ...product }); // Khởi tạo state cục bộ với dữ liệu sản phẩm
    }
  }, [product]);

  if (!editableProduct) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onClose(); // Đóng popup sau khi lưu
  };

  const handleDelete = () => {
    onDelete(editableProduct.id); // Gọi hàm xóa và truyền id sản phẩm cần xóa
    onClose(); // Đóng popup sau khi xóa
  };

  return (
    <div className="popup-overlay">
      <div className="popup-add_product">
        <div className="header">
          <h2>Chi tiết sản phẩm</h2>
          <button type="button" className="close-button-productdetail" onClick={onClose}>
            &times;
          </button>
        </div>

        <div>
          <label>Loại:</label>
          <input
            type="text"
            name="category"
            value={editableProduct.category}
          />
        </div>

        <div>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            name="name"
            value={editableProduct.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Giá:</label>
          <input
            type="text"
            name="price"
            value={editableProduct.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Chú thích:</label>
          <textarea
            name="note"
            value={editableProduct.note || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Ảnh sản phẩm:</label>
          <div className="image-placeholder">
            {editableProduct.image ? (
              <img
                src={editableProduct.image}
                alt="Product"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              "Không có ảnh"
            )}
          </div>
        </div>

        <div className="button-group">
          <button type="button" className="delete-button" onClick={handleDelete}>
            Xóa
          </button>
          <button type="submit" className="save-button" onClick={handleSave} >
            Lưu
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailPopup;
