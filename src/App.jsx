import React, { useContext } from "react";
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import AdminDashboard from "./pages/Admin/AdminDashboard.page";
import CreateTask from "./pages/Admin/CreateTask.page";
import ManageTasks from "./pages/Admin/ManageTasks.page";
import ManageUsers from "./pages/Admin/ManageUsers.page";

import Login from "./pages/Auth/Login.page";
import Signup from "./pages/Auth/Signup.page";

import Dashboard from "./pages/User/Dashboard.page";
import MyTasks from "./pages/User/MyTasks.page";
import ViewTaskDetails from "./pages/User/ViewTaskDetails.page";

import { Toaster } from "react-hot-toast";
import UserProvider, { UserContext } from "./context/userContext.context";
import PrivateRoute from "./routes/PrivateRoute.route";

const App = () => {
  return (
    <UserProvider>
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
              <Route
                path="/user/tasks/task/:id"
                element={<ViewTaskDetails />}
              />
            </Route>

            {/* Default Route */}
            <Route path="/" element={<Root />} />
          </Routes>
        </Router>
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <Outlet />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
};
