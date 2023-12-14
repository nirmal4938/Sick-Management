// client/src/components/Topbar.js
import { Menubar } from "primereact/menubar";
import React from "react";

const Topbar = () => {
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        // Handle Home click
      },
    },
    {
      label: "About",
      icon: "pi pi-info",
      command: () => {
        // Handle About click
      },
    },
    // Add more menu items as needed
  ];

  return <Menubar model={items} className="bg-blue-200" />;
};

export default Topbar;
