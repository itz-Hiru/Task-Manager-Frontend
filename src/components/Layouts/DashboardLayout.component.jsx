import React, { useContext } from "react";
import { UserContext } from "../../context/userContext.context";
import Navbar from "./Navbar.component";
import SideMenu from "./SideMenu.component";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="">
      <Navbar activeMenu={activeMenu}>
        {user && (
          <div className="flex">
            <div className="max-[1080px]:hidden">
              <SideMenu activeMenu={activeMenu} />
            </div>
            <div className="grow mx-5">{children}</div>
          </div>
        )}
      </Navbar>
    </div>
  );
};

export default DashboardLayout;
