// client/src/components/Sidebar.js
import { PanelMenu } from "primereact/panelmenu";
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Sick Management", // Title at the top of the sidebar
      style: { fontWeight: "bold", fontSize: "1.2em", margin: "10px 0" },
      disabled: true, // To make it non-clickable
    },
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
      command: () => navigate("/dashboard"),
      //   items: [
      //     {
      //       label: "User Dashboard",
      //       icon: "pi pi-fw pi-user",
      //       // Add more submenu items as needed
      //     },
      //   ],
    },
    {
      label: "Create User",
      icon: "pi pi-fw pi-user",
      command: () => navigate("/create-user"),
    },
    {
      label: "Apply Leave",
      icon: "pi pi-fw pi-clock",
      command: () => navigate("/apply-leave"),
    },
    // Add more sidebar items as needed
  ];

  return (
    <div
      style={{
        height: "100%",
        position: "fixed",
        overflowY: "auto",
        width: "250px",
      }}
      className="sidebar"
    >
      <PanelMenu model={items} style={{ width: "100%", minHeight: "100vw" }} />
    </div>
  );
};

export default Sidebar;
