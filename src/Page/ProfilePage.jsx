import React from "react";
import { Container } from "../components/styles/ProfilePageStyle";
import Dashboard from "../components/user/Dashboard";
import UserDetails from "../components/common/UserDetails";
import { useAuth } from "../contexts/AuthContext";
import AdminDashboard from "../components/Admin/AdminDashboard";

export default function ProfilePage() {
  const { userDetail } = useAuth();

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
      {userDetail ? (
        <>
          <UserDetails /> {checkUserDetail()}{" "}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
}
