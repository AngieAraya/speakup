import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { firestore } from "../../firebase";
import UpdateProfile from "../user/UpdateProfile";
import UserAvatar from "react-user-avatar";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

export default function UserDetails() {
  const {
    userDetail,
    setUserDetail,
    deleteUser,
    currentUser,
    deleteUserFromDB,
  } = useAuth();
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
    if (userDetail.updateprofile) {
      if (userDetail.name)
        return (
          <AvatarWrapper>
            <UserAvatar
              size="78"
              name={userDetail.name}
              colors={["#b7efd9", "#acd4e5", "#75d7c3"]}
            />
          </AvatarWrapper>
        );
    } else {
      return <ProfileImg src={currentUser.photoURL} alt="no user img" />;
    }
  };

  return (
    <UserDetaiContainer>
      {userDetail ? (
        <div>
          <UserDetailWrapper>
            {/* <ProfileImg src={userImg} alt="no user img" /> */}
            {ImgChecker(userDetail)}
            <div>
              <UserName>{userDetail.name}</UserName>
              {/* ha eller släng email ? */}
              {/* <UserEmail>{userDetail.email}</UserEmail> */}
            </div>
            <ButtonWrapper>
              {userDetail.updateprofile && (
                <Button onClick={() => setShowModal(true)}>
                  <FiSettings />
                  Uppdatera
                </Button>
              )}
              <ButtonDelete onClick={() => setShowDeleteModal(true)}>
                <FaTrashAlt />
                Radera konto
              </ButtonDelete>
            </ButtonWrapper>
          </UserDetailWrapper>
          {showModal ? <UpdateProfile setShowModal={setShowModal} /> : null}
          {showDeleteModal ? (
            <Modal>
              <ModalContainer>
                <ModalCloseBtn>
                  <AiOutlineClose onClick={() => setShowDeleteModal(false)} />
                </ModalCloseBtn>
                <ModalHeading>
                  Är du säker på att du vill radera ditt konto?
                </ModalHeading>{" "}
                <ModalButtonWrapper>
                  <ButtonDelete onClick={() => handleDelete()}>
                    Radera konto
                  </ButtonDelete>
                  <Button onClick={() => setShowDeleteModal(false)}>
                    Avbryt
                  </Button>
                </ModalButtonWrapper>
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
export const Button = styled.button`
  letter-spacing: 1px;
  gap: 5px;
  padding: 3px 55px;
  border: none;
  border-radius: 10px;
  background-color: rgb(119 207 191);
  color: rgb(255, 255, 255);
  cursor: pointer;
  transition: all 0.3s ease 0s;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
  justify-content: center;
  display: flex;
  width: 130px;
  padding: 6px 7px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: rgb(79 176 159);
    color: white;
  }
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 320px;
  margin: 40px auto 10px;
`;

export const ButtonDelete = styled(Button)`
  background-color: #d95f76;
  &:hover {
    background-color: #e05353;
    color: white;
  }
`;

export const UserDetaiContainer = styled.div`
  @media (min-width: 800px) {
    margin: 40px;
  }
`;

export const ModalHeading = styled.h1`
  font-size: 24px;
  font-weight: 400;
`;

export const ProfileImg = styled.img`
  // height: 170px;
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
  &:hover {
    color: #4e746a;
  }
`;

export const UserDetailWrapper = styled.div`
  max-width: 80%;
  padding: 10px;
  text-align: center;
  @media (min-width: 800px) {
    // display: flex;
    // justify-content: start;
    // align-items: center;
    display: grid;
    grid-template-columns: 160px 2fr 1fr;
    align-items: center;
  }
`;

export const UserName = styled.h3`
  font-size: 18px;
  text-transform: capitalize;
  margin: 14px 0 65px;
  text-align: center;
  @media screen and (min-width: 800px) {
    margin: 0;
    font-size: 25px;
    text-align: left;
  }
`;

export const UserEmail = styled.h3`
font-size: 13px;
}
`;
export const AvatarWrapper = styled.div`
display: flex;
justify-content: center;
}
`;

export const ButtonWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
gap: 15px;
}
`;
