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
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [products, setProducts] = useState(productsData);
  const [showBillPopup, setShowBillPopup] = useState(false);
  const [tableList, setTableList] = useState(tables); // Đảm bảo bạn quản lý danh sách bàn ở đây

  // Cập nhật trạng thái của bàn khi thanh toán
  const handlePayment = () => {
    // Đóng pop-up hóa đơn
    setShowBillPopup(false);
    
    // Deselect table
    setSelectedTableId(null);
    
    // Cập nhật trạng thái bàn về 'empty' và xóa dữ liệu sản phẩm của bàn đó
    setTableList((prevTables) =>
      prevTables.map((table) =>
        table.id === selectedTableId
          ? { ...table, status: "empty" } // Chuyển trạng thái bàn về "empty"
          : table
      )
    );
    
    // Xóa các sản phẩm của bàn đã thanh toán
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.tableId !== selectedTableId)
    );
  };


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

  // Tính tổng số tiền cho bàn hiện tại
  const tableProducts = products.filter(
    (product) => product.tableId === selectedTableId
  );
  const totalAmount = tableProducts.reduce(
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
          {currentView === "phongban" && (
            <TableView
              tables={tableList} // Truyền danh sách bàn đã được cập nhật
              onTableSelect={setSelectedTableId} // Truyền hàm chọn bàn
              setTables={setTableList} // Cập nhật lại trạng thái của bàn
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          )}

          {currentView === "thucdon" && <MenuView products={products} />}
        </div>

        <div className="content-right">
          <TransactionView
            selectedTableId={selectedTableId}
            tableData={tableList} // Truyền bảng đã được cập nhật
            products={tableProducts}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            totalAmount={totalAmount}
            showBillPopup={showBillPopup}
            setShowBillPopup={setShowBillPopup}
            handlePayment={handlePayment} // Truyền hàm thanh toán
          />
        </div>
      </div>
    </div>
  );
}

export default Employee;
