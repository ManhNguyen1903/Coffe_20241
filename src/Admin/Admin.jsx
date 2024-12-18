import React, { useState } from "react";
import "./Admin.css";
import NavBarAdmin from "./NavBarAdmin";
import { products } from "../Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddProductPopup from "./AddProductPopUp";
import ProductDetailPopup from "./ProductDetailPopup.jsx"; // Import popup chi tiết sản phẩm

function Admin() {
  const [activeMenu, setActiveMenu] = useState("Quản lý sản phẩm");
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Lưu sản phẩm được chọn

  // Lấy danh mục sản phẩm từ dữ liệu
  const categories = ["Tất cả", ...new Set(products.map((product) => product.category))];

  // Lọc sản phẩm theo danh mục
  const filteredProducts =
    activeFilter === "Tất cả"
      ? products
      : products.filter((product) => product.category === activeFilter);

  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = [...products, updatedProduct]; // Thêm sản phẩm mới vào danh sách
    setProducts(updatedProducts); // Cập nhật lại state

    // Lưu danh sách sản phẩm vào LocalStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setSelectedProduct(null); // Đảm bảo đóng popup sau khi lưu
  };

      
  return (
    <div className="admin-container">
      {/* Navbar trên cùng */}
      <NavBarAdmin />

      <div className="admin-body">
        {/* Menu bên trái */}
        <div className="sidebar">
          <ul>
            <button
              className={activeMenu === "Quản lý sản phẩm" ? "active" : ""}
              onClick={() => setActiveMenu("Quản lý sản phẩm")}
            >
              Quản lý sản phẩm
            </button>
            <button
              className={activeMenu === "Quản lý nhân viên" ? "active" : ""}
              onClick={() => setActiveMenu("Quản lý nhân viên")}
            >
              Quản lý nhân viên
            </button>
            <button
              className={activeMenu === "Quản lý bàn" ? "active" : ""}
              onClick={() => setActiveMenu("Quản lý bàn")}
            >
              Quản lý bàn
            </button>
            <button
              className={activeMenu === "Lịch sử giao dịch" ? "active" : ""}
              onClick={() => setActiveMenu("Lịch sử giao dịch")}
            >
              Lịch sử giao dịch
            </button>
            <button
              className={activeMenu === "Doanh thu" ? "active" : ""}
              onClick={() => setActiveMenu("Doanh thu")}
            >
              Doanh thu
            </button>
          </ul>
        </div>

        {/* Nội dung chính */}
        <div className="main-content">
          {activeMenu === "Quản lý sản phẩm" && (
            <div className="product-management">
              <div className="header-container">
                {/* Bộ lọc sản phẩm */}
                <div className="filter">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={activeFilter === category ? "active" : ""}
                      onClick={() => setActiveFilter(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Nút thêm sản phẩm */}
                <button
                  className="add-product-icon"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FontAwesomeIcon icon={faPlus} size="4x" />
                </button>

                {/* Giao diện thêm sản phẩm */}
                <AddProductPopup
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onUpdate={handleUpdateProduct}
                />
              </div>

              {/* Danh sách sản phẩm */}
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() => setSelectedProduct(product)} // Hiển thị chi tiết sản phẩm
                  >
                    <div className="product-image">Ảnh sản phẩm</div>
                    <div className="product-info">
                      <p className="product-name">{product.name}</p>
                      <p className="product-price">{product.price} VNĐ</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Popup chi tiết sản phẩm */}
              {selectedProduct && (
                <ProductDetailPopup
                  product={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                  onUpdate={handleUpdateProduct}
                />
              )}
              
            </div>
          )}

          {/* Các menu khác */}
          {activeMenu === "Quản lý nhân viên" && (
            <div>
              <h2>Quản lý nhân viên</h2>
              <p>Nội dung hiển thị quản lý nhân viên...</p>
            </div>
          )}
          {activeMenu === "Quản lý bàn" && (
            <div>
              <h2>Quản lý bàn</h2>
              <p>Nội dung hiển thị quản lý bàn...</p>
            </div>
          )}
          {activeMenu === "Lịch sử giao dịch" && (
            <div>
              <h2>Lịch sử giao dịch</h2>
              <p>Nội dung hiển thị lịch sử giao dịch...</p>
            </div>
          )}
          {activeMenu === "Doanh thu" && (
            <div>
              <h2>Doanh thu</h2>
              <p>Nội dung hiển thị doanh thu...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
