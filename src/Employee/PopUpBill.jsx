import React from "react";
import "./PopUpBill.css";

const PopUpBill = ({ isVisible, products, totalAmount, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Hóa đơn</h2>
        <table className="bill-table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{(product.price * product.quantity).toLocaleString("vi-VN")}₫</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bill-total">
          Tổng tiền: {totalAmount.toLocaleString("vi-VN")}₫
        </div>
        <button className="close-btn" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default PopUpBill;
