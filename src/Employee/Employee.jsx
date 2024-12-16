import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Nếu dùng react-router-dom
import PopUpBill from "./PopupBill"; // Import component Popup đúng tên
import "./Employee.css";
import Navbar from "./Navbar";
import { categories } from "../Data";
import { tables } from "../Data";
import { productsData } from "../Data";

function Employee() {
  const [currentView, setCurrentView] = useState("phongban"); // Trạng thái mặc định là "Thực đơn"
  const [selectedFilter, setSelectedFilter] = useState("all"); // Lưu trạng thái được chọn ("all", "empty", "occupied")

  const [selectedCategory, setSelectedCategory] = useState(1);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const [activeButton, setActiveButton] = useState(null); // Theo dõi nút đang nhấn

  const handleClick = (buttonId) => {
    setActiveButton(buttonId); // Cập nhật trạng thái cho nút được nhấn
  };

  const selectedCategoryData =
    categories.find((category) => category.id === selectedCategory) || {};

    // Lọc danh sách bàn theo trạng thái
  const filteredTables =
    selectedFilter === "all"
      ? tables
      : tables.filter((table) => table.status === selectedFilter);


  const [products, setProducts] = useState(productsData);

  // Hàm tăng số lượng
  const increaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Hàm giảm số lượng
  const decreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  // Tính tổng tiền
  const totalAmount = products.length
  ? products.reduce((total, product) => total + product.quantity * product.price, 0)
  : 0;


  const navigate = useNavigate();
  const [showBillPopup, setShowBillPopup] = useState(false);
  
  return (
    <div className="employee">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeButton={activeButton}
        handleClick={handleClick}
      />
      {/* Nội dung hiển thị */}
      <div className="content">
        <div className="content-left">
        {currentView === "phongban" && (
            <div className="view-table">
              {/* Hàng đầu tiên: Bộ lọc */}
              <div className="table-note">
                <div
                  className={`note-table ${
                    selectedFilter === "all" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFilter("all")}
                >
                  Tất cả
                </div>
                <div
                  className={`note-table ${
                    selectedFilter === "empty" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFilter("empty")}
                >
                  Trống
                </div>
                <div
                  className={`note-table ${
                    selectedFilter === "occupied" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFilter("occupied")}
                >
                  Có khách
                </div>
              </div>

              {/* Hàng thứ hai: Danh sách bàn */}
              <div className="table-list">
                {filteredTables.map((table) => (
                  <div
                    key={table.id}
                    className={`table-item ${table.status === "occupied" ? "occupied" : ""}`}
                  >
                    {table.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          {currentView === "thucdon" && (
            <div className="view">
              <div className="category">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-item ${
                      selectedCategory === category.id ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="menu">
                {selectedCategoryData.products ? (
                  selectedCategoryData.products.map((product) => (
                    <div key={product.id} className="menu-item">
                      <img src={product.image} alt={product.name} />
                      <div className="name">{product.name}</div>
                      <div className="price">{product.price}</div>
                    </div>
                  ))
                ) : (
                  <p>Không có sản phẩm nào.</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="content-right">
          {currentView !== "giaodich" && (
            <div className="transaction">
              <div className="Bill">
                <table className="transaction-table">
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Bảng giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          {product.name}
                          <div className="note">
                            <textarea placeholder="Ghi chú"></textarea>
                          </div>
                        </td>

                        <td className="quantity-cell">
                          <button
                            className="quantity-btn"
                            onClick={() => decreaseQuantity(product.id)}
                          >
                            -
                          </button>
                          <span>{product.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => increaseQuantity(product.id)}
                          >
                            +
                          </button>
                        </td>
                        <td>{product.price.toLocaleString("vi-VN")}₫</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="transaction-summary">
                <div className="notes">
                  <div> Bàn 3</div>
                  {/* <textarea placeholder="Ghi chú"></textarea> */}
                </div>
                <div className="total">
                  Tổng tiền: {totalAmount.toLocaleString("vi-VN")}₫
                </div>
              </div>
              <button
                className="checkout-btn"
                onClick={() => setShowBillPopup(true)}
              >
                Thanh toán
              </button>

              {/* Popup */}
              <PopUpBill
                isVisible={showBillPopup}
                products={products}
                totalAmount={totalAmount}
                onClose={() => setShowBillPopup(false)}
                />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Employee;
