import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/Layouts/DashboardLayout.component';
import { UserContext } from '../../context/userContext.context';
import { useUserAuth } from '../../hooks/useUserAuth.hook';

const AdminDashboard = () => {
  useUserAuth();

  const { user } =  useContext(UserContext); 

  const navigate = useNavigate();
  return (
    <DashboardLayout activeMenu="Dashboard">

    </DashboardLayout>
  )
}

export default AdminDashboard