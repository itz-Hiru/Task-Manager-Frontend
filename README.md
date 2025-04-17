
# ✅ Plan Pilot Task Manager - MERN Stack  
<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
</p>

<p align="center">
  <img src="https://media.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif" width="150" alt="coding animation">
</p>

Welcome to **Plan Pilot Task Manager** – a modern, responsive, and feature-rich task management app 🧠. Built with **React + Vite** and styled using **Tailwind CSS**, this frontend works seamlessly with a MERN backend to help users manage tasks while admins oversee team productivity.

---

## 🚀 Features

✨ Modern and intuitive UI  
🔐 User & Admin authentication with token handling  
📝 Create, update, and delete tasks  
📋 View tasks by status, priority, or deadline  
🧑‍💼 Admin Panel to manage all users and tasks  
📊 Task statistics with visual insights using `recharts`  
📥 Export task data (Excel or PDF ready backend)  
📤 Logout with session clear  
🔔 Toast notifications for all key actions  

---

## 🧰 Tech Stack & Libraries

| Category        | Technology          |
|-----------------|---------------------|
| ⚛️ Frontend     | React + Vite       |
| 🎨 Styling      | Tailwind CSS       |
| 🔗 Routing      | react-router-dom   |
| 📡 HTTP Client  | Axios              |
| 📆 Date Format  | moment.js          |
| 📈 Charts       | Recharts           |
| 🔔 Toast Alerts | react-hot-toast    |
| 🎨 Icons        | react-icons        |

---

## 📁 Folder Structure

```
src/
│
├── components/       # Reusable UI components
├── context/          # Auth and global context
├── hooks/            # Custom hooks
├── pages/            # Page-level views (Dashboard, Admin, etc.)
├── utils/            # Helper functions
├── App.jsx           # Main app component
├── index.css         # Global styles
└── main.jsx          # Entry point
```

---

## 🛠️ Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/itz-Hiru/Task-Manager-Frontend.git
   cd Task-Manager-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the app**
   ```bash
   npm run dev
   ```

   > The app runs at `http://localhost:5173/`

---

## 📦 Backend Integration

Ensure the [Plan Pilot MERN Backend](https://github.com/itz-Hiru/Task-Manager-Backend) is up and running. The frontend connects to endpoints like:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/users/`
- `GET /api/users/:id`
- `POST /api/users/`
- `GET /api/tasks/admin/dashboard-data`
- `GET /api/tasks/user/dashboard-data`
- `GET /api/tasks/`
- `POST /api/tasks/create`

---

## 🧑‍💻 Author

Developed with ❤️ by [@itz-hiru](https://hirumitha-portfolio.vercel.app)

---

## ⭐️ Show Your Support

If you love this project, please leave a ⭐️ and share with your dev friends!

---

<p align="center">
  <img src="https://media.giphy.com/media/jRf5fsn8G6YaogAWxn/giphy.gif" width="200" alt="thank you">
</p>
