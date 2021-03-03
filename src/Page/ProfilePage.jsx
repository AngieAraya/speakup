import React from "react";
import { Container } from "../components/styles/ProfilePageStyle";
import Dashboard from "../components/Dashboard";
import UserDetails from "../components/UserDetails";
import { useAuth } from "../contexts/AuthContext";
import AdminDashboard from "../components/AdminDashboard";

export default function ProfilePage() {
  const { userDetail } = useAuth();

  console.log("userDetail i profilepage", userDetail);

  const checkUserDetail = () => {
    if (userDetail) {
      if (userDetail.admin) {
        return <AdminDashboard />;
      } else {
        return <Dashboard />;
      }
    }
  };

  return (
    <Container>
      <h1>Profile Page</h1>
      <UserDetails />
      {checkUserDetail()}
      {/* <Dashboard /> */}
    </Container>
  );
}
