import React from 'react';
import AUTH_BG from "../../assets/images/Auth_Background.gif";

const AuthLayout = ({children}) => {
  return (
    <div className="flex">
        <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
            <h2 className="text-xl font-medium text-black">Task Manager</h2>
            {children}
        </div>

        <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-black/1 bg-cover bg-no-repeat bg-center overflow-hidden p-8">
            <img src={AUTH_BG} alt="authentication background image" className="w-64 lg:w-[90%]" />
        </div>
    </div>
  )
}

export default AuthLayout