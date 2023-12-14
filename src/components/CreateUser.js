// client/src/components/CreateUser.js
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    department: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const departments = [
    { label: "Select Department", value: null },
    { label: "HR", value: "HR" },
    { label: "IT", value: "IT" },
    // Add more departments as needed
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!formData.department) {
      newErrors.department = "Please select a department";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/user/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSuccessMessage("User created successfully");
          setFormData({ username: "", department: "" }); // Clear the form
        } else {
          const data = await response.json();
          setErrors({ apiError: data.message });
        }
      } catch (error) {
        console.error("Error creating user:", error.message);
        setErrors({ apiError: "An error occurred while creating the user" });
      }
    }
  };

  const cardHeader = (
    <div>
      <i
        className="pi pi-user-plus"
        style={{ fontSize: "2em", display: "flex", justifyContent: "center" }}
      ></i>
      <span style={{ display: "flex", justifyContent: "center" }}>
        Add New User
      </span>
    </div>
  );

  return (
    <Card
      title={cardHeader}
      //   subTitle="Fill out the form to add a new user"
      style={{ width: "700px" }}
    >
      <form onSubmit={handleSubmit} className="p-fluid">
        <div className="p-field">
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "p-invalid" : ""}
          />
          <small className="p-error">{errors.username}</small>
        </div>

        <div className="p-field">
          <label htmlFor="department">Department</label>
          <Dropdown
            id="department"
            name="department"
            value={formData.department}
            options={departments}
            onChange={handleChange}
            placeholder="Select Department"
            className={errors.department ? "p-invalid" : ""}
          />
          <small className="p-error">{errors.department}</small>
        </div>

        <div className="p-field mt-2">
          <Button type="submit" label="Add User" />
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

export default CreateUser;
