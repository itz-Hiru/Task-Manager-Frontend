import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { LuTrash2 } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import AddAttachments from "../../components/Inputs/AddAttachments.component";
import SelectDropdown from "../../components/Inputs/SelectDropdown.component";
import SelectUsers from "../../components/Inputs/SelectUsers.component";
import TodoListInput from "../../components/Inputs/TodoListInput.component";
import DashboardLayout from "../../components/Layouts/DashboardLayout.component";
import { UserContext } from "../../context/userContext.context";
import { useUserAuth } from "../../hooks/useUserAuth.hook";
import { API_PATHS } from "../../utils/apiPath.util";
import axiosInstance from "../../utils/axiosInstance.util";
import { PRIORITY_DATA } from "../../utils/data.util";

const CreateTask = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    toDoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  // Create task
  const createTask = async () => {
    setLoading(true);

    try {
      const todolist = taskData.toDoChecklist?.map((item, index) => ({
        text: item,
        completed: false,
      }));

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        toDoChecklist: todolist,
      });

      toast.success("Task created successfully.");
      clearData();
    } catch (e) {
      console.error("Error creating task", e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Get task information by Id
  const getTaskDetailsById = async () => {};

  // Update task
  const updateTask = async () => {};

  const handleSubmit = async () => {
    setError(null);

    // Inputs Validation
    if (!taskData.title.trim()) {
      setError("Title is required!");
      return;
    }

    if (!taskData.description.trim()) {
      setError("Task description is required");
      return;
    }

    if (!taskData.dueDate) {
      setError("Task due date is required");
      return;
    }

    if (taskData.assignedTo?.length === 0) {
      setError("Task is not assigned to any member");
      return;
    }

    if (taskData.toDoChecklist?.length === 0) {
      setError("Add at least one check point");
      return;
    }

    if (taskId) {
      updateTask();
      return;
    }

    createTask();
  };

  // Reset create task form
  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      toDoChecklist: [],
      attachments: [],
    });
  };

  // Delete Task
  const deleteTask = async () => {};

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" />
                  Delete
                </button>
              )}
            </div>

            {/* Form */}
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
                placeholder="Task name/ title"
                className="form-input"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>
              <textarea
                placeholder="Describe about the task"
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => {
                    handleValueChange("priority", value);
                  }}
                  placeholder="Select priority level"
                />
              </div>
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={taskData.dueDate}
                  onChange={({ target }) =>
                    handleValueChange("dueDate", target.value)
                  }
                />
              </div>
              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">
                  Assigned Users
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handleValueChange("assignedTo", value);
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Add Checklist
              </label>
              <TodoListInput
                todoList={taskData?.toDoChecklist}
                setTodoList={(value) =>
                  handleValueChange("toDoChecklist", value)
                }
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Attachments
              </label>
              <AddAttachments
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500">{error}</p>
            )}

            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;
