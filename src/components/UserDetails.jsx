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
import styled from "styled-components";

export const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  display: flex;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const ModalContainer = styled.div`
  background: #eeeeee;
  width: 50%;
  margin: auto;
  border-radius: 10px;
  min-height: 14%;
  padding: 28px;
`;
export default function UserDetails() {
  const { userDetail, setUserDetail, deleteUser, currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  console.log("userDetail profile prob", userDetail);

  useEffect(() => {
    if (userDetail) {
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

  const deleteUserFromDB = async () => {
    const db = await firestore;
    return db
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
    setUserDetail({});
    deleteUser();
    deleteUserFromDB();
  };

  return (
    <UserDetaiContainer>
      {userDetail ? (
        <div>
          <UserDetailWrapper>
            <ProfileImg src={userImg} alt="no user img" />
            <div>
              <h2>Namn: {userDetail.name}</h2>
              <h3>Email: {userDetail.email}</h3>
            </div>
          </UserDetailWrapper>
          {userDetail.updateprofile && (
            <Button onClick={() => setShowModal(true)}>Upddate</Button>
          )}
          {/* <UpdateLink to="/update-profile">Update Profile</UpdateLink> */}
          <ButtonDelete onClick={() => setShowDeleteModal(true)}>
            Delete Account
          </ButtonDelete>
          {showModal ? <UpdateProfile setShowModal={setShowModal} /> : null}
          {showDeleteModal ? (
            <Modal>
              <ModalContainer>
                <h1>Är du säker på att du vill radera ditt konto?</h1>{" "}
                <ButtonDelete onClick={() => handleDelete()}>
                  Radera konto
                </ButtonDelete>
              </ModalContainer>
            </Modal>
          ) : null}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </UserDetaiContainer>
  );
}

// {showDeleteModal ? (
//   <Modal>
//     <ModalContainer>
//       <h1>Ärdu säker på att du vill radera konto?</h1>{" "}
//       <ButtonDelete onClick={() => handleDelete()}>
//         Delete Account
//       </ButtonDelete>
//     </ModalContainer>
//   </Modal>
// ) : null}
