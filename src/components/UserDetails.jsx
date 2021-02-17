import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function UserDetails() {
  const { userDetail } = useAuth();

  return (
    <div>
      {userDetail ? (
        <div key={userDetail.uid}>
          <h2>{userDetail.email}</h2>
          <h3>{userDetail.name}</h3>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
