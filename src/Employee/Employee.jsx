import React, { useState } from "react";
import Navbar from "./Navbar";
import TableView from "./TableView";
import MenuView from "./MenuView";
import TransactionView from "./TransactionView";
import { tables, productsData } from "../Data";
import "./Employee.css";

function Employee() {
  const [currentView, setCurrentView] = useState("phongban");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [products, setProducts] = useState(productsData);
  const [showBillPopup, setShowBillPopup] = useState(false);

  // Lọc bàn
  const filteredTables =
    selectedFilter === "all"
      ? tables
      : tables.filter((table) => table.status === selectedFilter);

  // Tăng số lượng sản phẩm
  const increaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Giảm số lượng sản phẩm
  const decreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  // Tính tổng số tiền
  const totalAmount = products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  return (
    <div className="employee">
      {/* Thanh điều hướng */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Nội dung chính */}
      <div className="content">
        <div className="content-left">
          {/* Hiển thị TableView khi chọn 'phongban' */}
          {currentView === "phongban" && (
            <TableView
              filteredTables={filteredTables}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          )}

          {/* Hiển thị MenuView khi chọn 'thucdon' */}
          {currentView === "thucdon" && (
            <MenuView
              products={products} // Truyền danh sách sản phẩm
            />
          )}
        </div>

        <div className="content-right">
          {/* TransactionView quản lý hóa đơn */}
          <TransactionView
            products={products}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            totalAmount={totalAmount}
            showBillPopup={showBillPopup}
            setShowBillPopup={setShowBillPopup}
          />
        </div>
      </div>
    </div>
  );
}

export default Employee;
