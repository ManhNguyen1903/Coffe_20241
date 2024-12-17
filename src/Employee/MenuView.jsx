import React, { useState } from "react";
import "./MenuView.css"; // Create and style this as needed
import { products } from "../Data";

function MenuView() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  // Lấy danh mục sản phẩm từ dữ liệu
  const categories = ["Tất cả", ...new Set(products.map((product) => product.category))];

  // Lọc sản phẩm theo danh mục
  const filteredProducts =
    activeFilter === "Tất cả"
      ? products
      : products.filter((product) => product.category === activeFilter);
  return (
    <div className="view">
      <div className="category">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-item ${
                      activeFilter === category ? "active" : ""
                    }`}
          onClick={() => setActiveFilter(category)}
        >
          {category}
        </button>
      ))}
      </div>

      <div className="menu">
      {filteredProducts.map((product) => (
          <div key={product.id} className="menu-item">
          <img src={product.image} alt={product.name} />
          <div className="name">{product.name}</div>
          <div className="price">{product.price}</div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default MenuView;
