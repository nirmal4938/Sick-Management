import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ApplyLeave from "./components/ApplyLeave";
import CreateUser from "./components/CreateUser";
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
        <Route path="/" element={<Navigate to="/create-user" />} />
      </Routes>
    </Router>
  );
}

export default App;
