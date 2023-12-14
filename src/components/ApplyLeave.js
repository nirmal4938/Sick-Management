// client/src/components/ApplyLeave.js
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    username: "",
    department: "",
    leaveType: "",
    duration: null,
  });

  const [leaveTypes] = useState(["Sick Leave", "Casual Leave"]);
  const [users, setUsers] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState({
    sickLeave: 2,
    casualLeave: 2,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Mock data for users (you should fetch this from the backend)
  useEffect(() => {
    const fetchUsers = async () => {
      // Replace with actual API call to fetch users
      const response = await fetch("http://localhost:5000/user/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleUsernameChange = (e) => {
    const selectedUsername = e.target.value;
    const selectedUser = users.find(
      (user) => user.username === selectedUsername
    );

    setFormData((prevData) => ({
      ...prevData,
      username: selectedUsername,
      department: selectedUser ? selectedUser.department : "",
      user_id: selectedUser?._id,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDurationChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      duration: e.value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Please select a username";
      valid = false;
    }

    if (!formData.leaveType) {
      newErrors.leaveType = "Please select a leave type";
      valid = false;
    }

    if (!formData.duration || formData.duration.length !== 2) {
      newErrors.duration = "Please select the duration";
      valid = false;
    }

    // Calculate the number of days in the selected range
    const startDate = formData.duration[0];
    const endDate = formData.duration[1];
    const selectedDays = (endDate - startDate) / (24 * 60 * 60 * 1000) + 1;

    if (
      formData.leaveType === "Sick Leave" &&
      selectedDays > leaveBalances.sickLeave
    ) {
      newErrors.duration = "Not enough sick leave balance";
      valid = false;
    }

    if (
      formData.leaveType === "Casual Leave" &&
      selectedDays > leaveBalances.casualLeave
    ) {
      newErrors.duration = "Not enough casual leave balance";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/leave/apply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            // Convert date objects to string
            duration: formData.duration.map(
              (date) => date.toISOString().split("T")[0]
            ),
          }),
        });

        if (response.ok) {
          setSuccessMessage("Leave application submitted successfully");
          setFormData({
            username: "",
            department: "",
            leaveType: "",
            duration: null,
          }); // Clear the form
        } else {
          const data = await response.json();
          setErrors({ apiError: data.message });
        }
      } catch (error) {
        console.error("Error submitting leave application:", error.message);
        setErrors({
          apiError: "An error occurred while submitting the leave application",
        });
      }
    }
  };

  const cardHeader = (
    <div>
      <i
        className="pi pi-calendar-plus"
        style={{ fontSize: "2em", display: "flex", justifyContent: "center" }}
      ></i>
      <span
        style={{
          marginLeft: "10px",
          fontSize: "1.5em",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Apply for Leave
      </span>
    </div>
  );

  return (
    <Card title={cardHeader} style={{ width: "700px" }}>
      <form onSubmit={handleSubmit} className="p-fluid">
        <div className="p-field">
          <label htmlFor="username">Username</label>
          <Dropdown
            id="username"
            name="username"
            value={formData.username}
            options={users.map((user) => ({
              label: user.username,
              value: user.username,
            }))}
            onChange={handleUsernameChange}
            placeholder="Select Username"
            className={errors.username ? "p-invalid" : ""}
          />
          <small className="p-error">{errors.username}</small>
        </div>

        <div className="p-field">
          <label htmlFor="department">Department</label>
          <InputText
            id="department"
            name="department"
            value={formData.department}
            readOnly
          />
        </div>

        <div className="p-field">
          <label htmlFor="leaveType">Leave Type</label>
          <Dropdown
            id="leaveType"
            name="leaveType"
            value={formData.leaveType}
            options={leaveTypes.map((type) => ({ label: type, value: type }))}
            onChange={handleChange}
            placeholder="Select Leave Type"
            className={errors.leaveType ? "p-invalid" : ""}
          />
          <small className="p-error">{errors.leaveType}</small>
        </div>

        <div className="p-field">
          <label htmlFor="duration">Duration</label>
          <Calendar
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleDurationChange}
            className={errors.duration ? "p-invalid" : ""}
            selectionMode="range"
            showIcon
          />
          <small className="p-error">{errors.duration}</small>
        </div>

        <div className="p-field mt-2">
          <Button type="submit" label="Apply Leave" />
        </div>

        {errors.apiError && (
          <div className="p-field">
            <small className="p-error">{errors.apiError}</small>
          </div>
        )}

        {successMessage && (
          <div className="p-field">
            <small className="p-success">{successMessage}</small>
          </div>
        )}
      </form>
    </Card>
  );
};

export default ApplyLeave;
