import React, { useContext } from 'react';
import DashboardLayout from '../../components/Layouts/DashboardLayout.component';
import { UserContext } from '../../context/userContext.context';
import { useUserAuth } from '../../hooks/useUserAuth.hook';

const MyTasks = () => {
  useUserAuth();
  
    const { user } = useContext(UserContext);
  return (
    <DashboardLayout activeMenu="My Tasks">

    </DashboardLayout>
  )
}

export default MyTasks