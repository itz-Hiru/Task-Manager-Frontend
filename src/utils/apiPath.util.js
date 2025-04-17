export const BASIC_URL = "http://localhost:3000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Register a new user
    LOGIN: "/api/auth/login", // Login user
    GET_PROFILE: "/api/auth/profile", // Get logged-in user details
  },

  USERS: {
    GET_ALL_USERS: "/api/users/", // Get all users (Admin only)
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`, // Get user by Id
    CREATE_USER: "/api/users/", // Create new user (Admin only)
  },

  TASKS: {
    GET_ADMIN_DASHBOARD_DATA: "/api/tasks/admin/dashboard-data", // Get admin's dashboard data
    GET_DASHBOARD_DATA: "/api/tasks/user/dashboard-data", // Get user's dashboard data
    GET_ALL_TASKS: "/api/tasks/", // Get all tasks (Admin: all tasks, User: only assigned tasks)
    GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`, // Get task by Id
    CREATE_TASK: "/api/tasks/create", // Create a new task (Admin only)
    UPDATE_TASK: (taskId) => `/api/tasks/update/${taskId}`, // Update task details
    DELETE_TASK: (taskId) => `/api/tasks/delete/${taskId}`, // Delete task (Admin only)
    UPDATE_TASK_STATUS: (taskId) => `/api/tasks/update/${taskId}/status`, // Update task status
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/update/${taskId}/todo`, // Update task todo check list
  },

  REPORTS: {
    EXPORT_TASKS: "/api/report/export/tasks", // Get task report xlsx (Admin only)
    EXPORT_USERS: "/api/report/export/users", // Get users report xlsx (Admin only)
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", // Upload profile picture
  },
};
