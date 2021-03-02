import React, { useEffect, useState } from "react";
import {
  UpdateLink,
  ProfileImg,
  UserDetailWrapper,
  UserDetaiContainer,
  ButtonDelete,
  Button,
  
} from "../components/styles/ProfilePageStyle";
import userImg from "../img/NoUser1.png";
import { useAuth } from "../contexts/AuthContext";
import { firestore } from "../firebase";
import UpdateProfile from "./UpdateProfile";

export default function UserDetails() {
  const { userDetail, setUserDetail, deleteUser, currentUser } = useAuth();  
  const [ showModal, setShowModal ] = useState(false)

  // console.log("userDetail  profile", userDetail.admin);

  useEffect(() => {
    if(userDetail){
      const unsubscribe = firestore
      .collection("users")
      .where("id", "==", currentUser.uid)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setUserDetail(data[0]);
      });
    return () => unsubscribe();
    }
  }, []);


  const deleteUserFromDB = () => {
    firestore
      .collection("users")
      .doc(userDetail.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted from cloud firestorer!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleDelete = () => {
    deleteUser();
    deleteUserFromDB();
  };

  return (
    <UserDetaiContainer>
      {userDetail ? (
        <div>
          <UserDetailWrapper>
            <ProfileImg src={userImg} alt="no user img" />
            <div >
              <h2>Namn: {userDetail.name}</h2>
              <h3>Email: {userDetail.email}</h3>
            </div>
          </UserDetailWrapper>
         { userDetail.updateprofile && <Button onClick={()=> setShowModal(true)}>Upddate</Button>}
          {/* <UpdateLink to="/update-profile">Update Profile</UpdateLink> */}
          <ButtonDelete onClick={() => handleDelete()}>
            Delete Account
          </ButtonDelete>
          {showModal ? <UpdateProfile setShowModal={setShowModal}/> : null}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </UserDetaiContainer>
  );
}
