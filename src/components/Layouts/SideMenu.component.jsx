import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext.context";
import {
  ADMIN_SIDE_MENU_DATA,
  USER_SIDE_MENU_DATA,
} from "../../utils/data.util";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      setShowLogoutModal(true);
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? ADMIN_SIDE_MENU_DATA : USER_SIDE_MENU_DATA
      );
    }
  }, [user]);

  return (
    <>
      <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-30">
        <div className="flex flex-col items-center justify-center mb-7 pt-5">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center w-27 h-27 rounded-full border-primary border-1">
              <img
                src={user?.profileImageUrl || null}
                alt="Profile Image"
                className="w-25 h-25 rounded-full object-cover transition-transform duration-300 ease-in-out"
                decoding="async"
              />
            </div>
          </div>

          {user?.role === "admin" ? (
            <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-3">
              Admin
            </div>
          ) : (
            <div className="text-[10px] font-medium text-white bg-gray-500 px-3 py-0.5 rounded mt-3">
              Member
            </div>
          )}

          <h5 className="text-gray-950 font-medium leading-6 mt-3">
            {user?.name || ""}
          </h5>
          <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
        </div>

        {sideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] cursor-pointer ${
              activeMenu === item.label
                ? "text-primary bg-gradient-to-r from-blue-50/40 to-blue-100/50 border-r-4 border-primary"
                : ""
            } py-3 px-6 mb-3`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/15 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-1 w-[20%] text-center">
            <div className="bg-transparent border-2 border-slate-800/10 rounded-2xl p-4">
              <h2 className="text-lg font-semibold text-black/85 mb-1 text-start">
                Confirm Logout !
              </h2>
              <p className="text-gray-600 mb-6 text-start">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-end gap-6">
                <span
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer hover:underline"
                >
                  Yes
                </span>
                <span
                  onClick={() => setShowLogoutModal(false)}
                  className="text-primary cursor-pointer hover:underline"
                >
                  No
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideMenu;
