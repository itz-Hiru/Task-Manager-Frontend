import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCard } from "react-icons/io"
import DashboardLayout from "../../components/Layouts/DashboardLayout.component";
import { UserContext } from "../../context/userContext.context";
import { useUserAuth } from "../../hooks/useUserAuth.hook";
import { API_PATHS } from "../../utils/apiPath.util";
import axiosInstance from "../../utils/axiosInstance.util";
import { addThousandsSeparator } from "../../utils/helper.util";
import InfoCard from "../../components/Cards/InfoCard.component";

const AdminDashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [greeting, setGreeting] = useState("Hello");

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (e) {
      console.error("Error fetching users: ", e);
    }
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    if (hour < 20) return "Good evening";
    return "Good night"
  };

  useEffect(() => {
    getDashboardData();
    setGreeting(getTimeBasedGreeting());
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div className="">
          <div className="col-span-3">
            <h2 className="text-xl font-medium">
              {greeting}! <span className="mr-1">{user?.name}</span> 
            </h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            label=" Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-primary"
          />
          <InfoCard
            label=" Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-orange-500"
          />
          <InfoCard
            label=" In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Inprogress || 0
            )}
            color="bg-cyan-500"
          />
          <InfoCard
            label=" Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
