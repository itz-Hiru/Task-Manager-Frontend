import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AvatarGroup from "../../components/Cards/AvatarGroup.component";
import TodoChecklist from "../../components/Inputs/TodoChecklist.component";
import Attachment from "../../components/Layouts/Attachment.component";
import DashboardLayout from "../../components/Layouts/DashboardLayout.component";
import InfoBox from "../../components/Layouts/InfoBox.component";
import { API_PATHS } from "../../utils/apiPath.util";
import axiosInstance from "../../utils/axiosInstance.util";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    const normalized = status?.trim().toLowerCase();
    switch (normalized) {
      case "in progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/10";
      case "pending":
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
      default:
        return "text-gray-500 bg-gray-50 border border-gray-500/10";
    }
  };

  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );
      if (response.data) {
        setTask(response.data);
      }
    } catch (e) {
      console.error("Error fetching task details", e);
    }
  };

  const updateTodoChecklist = async (index) => {
    const updatedChecklist = [...task?.todoChecklist];
    if (!updatedChecklist[index]) return;

    updatedChecklist[index].completed = !updatedChecklist[index].completed;

    try {
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id),
        { todoChecklist: updatedChecklist }
      );
      if (response.status === 200) {
        setTask((prev) => ({
          ...prev,
          todoChecklist: updatedChecklist,
        }));
      }
    } catch (e) {
      console.error("Checklist update failed", e);
    }
  };

  const handleLinkClick = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link;
    }
    window.open(link, "_blank");
  };

  const updateTaskStatus = async (newStatus) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK_STATUS(id),
        { status: newStatus }
      );
      if (response.status === 200) {
        setTask((prev) => ({
          ...prev,
          status: newStatus,
        }));
      }
    } catch (e) {
      console.error("Failed to update task status", e);
    }
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }
  }, [id]);

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
            <div className="form-card col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-xl font-medium">
                  {task?.title}
                </h2>
                <div
                  className={`text-[11px] md:text-[13px] font-medium ${getStatusTagColor(
                    task?.status
                  )} px-4 py-0.5 rounded`}
                >
                  {task?.status}
                </div>
              </div>

              <div className="mt-4">
                <InfoBox label="Description" value={task?.description} />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority} />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <InfoBox
                    label="End Date"
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format("Do MMM YYYY")
                        : "N/A"
                    }
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-500">
                    Assigned To
                  </label>
                  <AvatarGroup
                    avatars={task?.assignedTo?.map(
                      (item) => item?.profileImageUrl || []
                    )}
                    maxVisible={5}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4 mt-2">
                <div className="col-span-12 lg:col-span-6">
                  <label className="text-xs font-medium text-slate-500">
                    Todo Checklist
                  </label>
                  {task?.todoChecklist?.map((item, index) => (
                    <TodoChecklist
                      key={`todo_${index}`}
                      text={item.text}
                      isChecked={item?.completed}
                      onChange={() => updateTodoChecklist(index)}
                    />
                  ))}
                </div>

                {task?.attachments?.length > 0 && (
                  <div className="col-span-12 lg:col-span-6">
                    <label className="text-xs font-medium text-slate-500">
                      Attachments
                    </label>
                    {task?.attachments?.map((link, index) => (
                      <Attachment
                        key={`link_${index}`}
                        index={index}
                        link={link}
                        onClick={() => handleLinkClick(link)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;
