import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai"
import { FiSettings } from "react-icons/fi"
import { useAuth } from "../../contexts/AuthContext";
import { firestore } from "../../firebase";
import UpdateProfile from "../user/UpdateProfile";
import UserAvatar from 'react-user-avatar'
import styled from "styled-components";

export const Button = styled.button`
letter-spacing: 1px;
padding: 3px 55px;
border: none;
border-radius: 10px;
background-color: rgb(94 60 128);
color: rgb(255, 255, 255);
cursor: pointer;
transition: all 0.3s ease 0s;
box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
&:hover {
  transition: all 0.2s ease-in-out;
  background-color: rgb(141 75 206);
  color: white;
}
`;

export const ButtonDelete = styled(Button)`
background-color: darkred;
&:hover {
  background-color: red;
  color: white;
}
`;

export const UserDetaiContainer = styled.div`
  margin: 40px;
`;

export const ProfileImg = styled.img`
height: 170px;
border-radius: 50%;
// margin-right: 30px;
object-fit: scale-down;
`;

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
  text-align: center;
`;
export const ModalCloseBtn = styled.div`
  text-align: right;
  cursor: pointer;
  &:hover{
    color: #4e746a;
  }
`;

export const UserDetailWrapper = styled.div`
display: flex;
justify-content: start;
align-items: center;
}
`;
export default function UserDetails() {
  const { userDetail, setUserDetail, deleteUser, currentUser, deleteUserFromDB } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleDelete = () => {
    setUserDetail({});
    deleteUser();
    deleteUserFromDB();
  };

  const ImgChecker = (userDetail) => {
    console.log(currentUser);
    if(userDetail.updateprofile){
      if(userDetail.name)
      return <UserAvatar size="78" name={userDetail.name} colors={['#b7efd9', '#acd4e5', '#75d7c3']} />
    }
    else{
      return (
      <ProfileImg src={currentUser.photoURL} alt="no user img" />)
    }

  }

  return (
    <UserDetaiContainer>
      {userDetail ? (
        <div>
          <UserDetailWrapper>
            {/* <ProfileImg src={userImg} alt="no user img" /> */}
            {ImgChecker(userDetail)}
            <div>
              <h2>Namn: {userDetail.name}</h2>
              <h3>Email: {userDetail.email}</h3>
            </div>
          </UserDetailWrapper>
          {userDetail.updateprofile && (
            <Button onClick={() => setShowModal(true)}><FiSettings/>Upddate</Button>
          )}
          <ButtonDelete onClick={() => setShowDeleteModal(true)}>
            Delete Account
          </ButtonDelete>
          {showModal ? <UpdateProfile setShowModal={setShowModal} /> : null}
          {showDeleteModal ? (
            <Modal>
              <ModalContainer>
                <ModalCloseBtn>
                <AiOutlineClose onClick={() => setShowDeleteModal(false)}/>
                </ModalCloseBtn>
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
