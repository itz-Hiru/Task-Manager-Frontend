import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu.component";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <button
          className="block lg:hidden text-black cursor-pointer"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="text-lg font-medium text-black">Task Manager</h2>
      </div>

      {openSideMenu && (
        <div className="lg:hidden fixed top-[61px] left-0 w-full bg-white z-20">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}

      <div className="hidden lg:block">
        <SideMenu activeMenu={activeMenu} />
      </div>
    </>
  );
};

export default Navbar;
