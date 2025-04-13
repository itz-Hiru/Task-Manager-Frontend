import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminDashboard from "./pages/Admin/AdminDashboard.page";
import CreateTask from "./pages/Admin/CreateTask.page";
import ManageTasks from "./pages/Admin/ManageTasks.page";
import ManageUsers from "./pages/Admin/ManageUsers.page";

import Login from "./pages/Auth/Login.page";
import Signup from "./pages/Auth/Signup.page";

import Dashboard from "./pages/User/Dashboard.page";
import MyTasks from "./pages/User/MyTasks.page";
import ViewTaskDetails from "./pages/User/ViewTaskDetails.page";

import PrivateRoute from "./routes/PrivateRoute.route";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={"admin"} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/manage/users" element={<ManageUsers />} />
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={"user"} />}>
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route path="/user/tasks/task/:id" element={<ViewTaskDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
