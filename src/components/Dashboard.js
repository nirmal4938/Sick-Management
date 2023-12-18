// Dashboard.js
import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/users");
        console.log("response", response);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch users: ${response.status} ${response.statusText}`
          );
        }

        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  // console.log("users", users);
  return (
    <div>
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        User Dashboard
      </h2>
      <UserTable users={users} />
    </div>
  );
};

export default Dashboard;
