import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ApplyLeave from "./components/ApplyLeave";
import CreateUser from "./components/CreateUser";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/create-user"
          element={
            <Layout>
              <CreateUser />
            </Layout>
          }
        />
        <Route
          path="/apply-leave"
          element={
            <Layout>
              <ApplyLeave />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
