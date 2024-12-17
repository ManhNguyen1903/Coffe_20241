import React from "react";
import PopUpBill from "./PopupBill";
import "./TransactionView.css"; // Create and style this as needed

function TransactionView({
  products,
  increaseQuantity,
  decreaseQuantity,
  totalAmount,
  showBillPopup,
  setShowBillPopup,
}) {
  

  return (
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
          <div>Bàn 3</div>
        </div>
        <div className="total">
          Tổng tiền: {totalAmount.toLocaleString("vi-VN")}₫
        </div>
      </div>
      <button className="checkout-btn" onClick={() => setShowBillPopup(true)}>
        Thanh toán
      </button>

      <PopUpBill
        isVisible={showBillPopup}
        products={products}
        totalAmount={totalAmount}
        onClose={() => setShowBillPopup(false)}
      />
    </div>
  );
}

export default TransactionView;
