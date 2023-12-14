import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./layout.css";
const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div
        style={{ flex: 1, marginLeft: "250px", overflowY: "auto" }}
        className="aside-content"
      >
        <Topbar />
        <div
          style={{
            padding: "20px",
            minHeight: "calc(100vh - 100px)",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
