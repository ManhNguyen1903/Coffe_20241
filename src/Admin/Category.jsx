import React, { useState } from "react";

function CategoryManagement() {
  const categories = [
    { id: 1, name: "Nước ép", products: [{}, {}, {}] },
    { id: 2, name: "Trà sữa", products: [{}, {}] },
    { id: 3, name: "Cà phê", products: [{}, {}] },
    { id: 4, name: "Sinh tố", products: [{}, {}, {}, {}] },
  ];

  return (
    <div className="category-management">
      <h2>Danh mục</h2>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên danh mục</th>
            <th>Số sản phẩm</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td>{index + 1}</td> {/* STT */}
              <td>{category.name}</td> {/* Tên danh mục */}
              <td>{category.products.length}</td> {/* Số sản phẩm */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryManagement;
