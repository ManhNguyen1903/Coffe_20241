import React from "react";
import "./TableView.css"; // Create and style this as needed

function TableView({ filteredTables, selectedFilter, setSelectedFilter }) {
  return (
    <div className="view-table">
      {/* Filter Options */}
      <div className="table-note">
        <div
          className={`note-table ${selectedFilter === "all" ? "active" : ""}`}
          onClick={() => setSelectedFilter("all")}
        >
          Tất cả
        </div>
        <div
          className={`note-table ${selectedFilter === "empty" ? "active" : ""}`}
          onClick={() => setSelectedFilter("empty")}
        >
          Trống
        </div>
        <div
          className={`note-table ${selectedFilter === "occupied" ? "active" : ""}`}
          onClick={() => setSelectedFilter("occupied")}
        >
          Có khách
        </div>
      </div>

      {/* Table List */}
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
  );
}

export default TableView;
