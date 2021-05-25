import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { firestore } from "../../firebase";
import UpdateProfile from "../user/UpdateProfile";
import UserAvatar from "react-user-avatar";
import styled from "styled-components";
import * as S from "../styles/ModalStyle";
import { Button, DeleteBtn }from "../styles/Buttons";
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
              <DeleteBtn onClick={() => setShowDeleteModal(true)}>
                <FaTrashAlt />
                Radera konto
              </DeleteBtn>
            </ButtonWrapper>
          </UserDetailWrapper>
          {showModal ? <UpdateProfile setShowModal={setShowModal} /> : null}
          {showDeleteModal ? (
            <S.Modal>
              <ModalContainer>
                <S.ModalCloseBtn>
                  <AiOutlineClose onClick={() => setShowDeleteModal(false)} />
                </S.ModalCloseBtn>
                <ModalHeading>
                  Är du säker på att du vill radera ditt konto?
                </ModalHeading>{" "}
                <S.ModalButtonWrapper>
                  <DeleteBtn onClick={() => handleDelete()}>
                    Radera konto
                  </DeleteBtn>
                  <Button onClick={() => setShowDeleteModal(false)}>
                    Avbryt
                  </Button>
                </S.ModalButtonWrapper>
              </ModalContainer>
            </S.Modal>
          ) : null}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </UserDetaiContainer>
  );
}

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
  border-radius: 50%;
  object-fit: scale-down;
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

export const UserDetailWrapper = styled.div`
  max-width: 80%;
  padding: 10px;
  text-align: center;
  @media (min-width: 800px) {
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
`;

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
`;
