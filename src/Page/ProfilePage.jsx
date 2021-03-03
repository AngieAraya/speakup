import React from 'react'
import { Container } from "../components/styles/ProfilePageStyle"
import Dashboard from '../components/Dashboard'
import UserDetails from '../components/UserDetails'
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from '../components/AdminDashboard';

export default function ProfilePage() {
  const { userDetail } = useAuth();  


  return (
    <Container>
     <h1>Profile Page</h1>
     <UserDetails/>
     {userDetail.admin ? <AdminDashboard/>: <Dashboard/> }
     
    </Container>
  )
}
