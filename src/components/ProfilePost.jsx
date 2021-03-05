import React, { useState } from "react";
import {
  Postwrapper,
  PostContainer,
  ButtonDelete,
} from "../components/styles/ProfilePageStyle";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { firestore } from "../firebase";
import { AiOutlineClose } from "react-icons/ai";
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
  text-align: center;
`;
export const ModalCloseBtn = styled.div`
  text-align: right;
  cursor: pointer;
  &:hover {
    color: #4e746a;
  }
`;
export const Right = styled.div`
  text-align: right;
  }
`;
export const BtnDeleteNoStyle = styled.button`
border-block-end-style: none; 
/* background: none; */
/* border: none; */
background: none;
/* color: inherit; */
border: none;
/* padding: 0; */
font: inherit;
cursor: pointer;
outline: inherit;
`;

export default function ProfilePost({ post }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (postDocId) => {
    firestore
      .collection("posts")
      .doc(postDocId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div>
      <PostContainer>
        <Postwrapper>
          <h2>{post.title}</h2>
          <h5>{post.description}</h5>
          <p>{post.text.substring(0, 300) + `...`}</p>
          <p>{post.collectionId}</p>
          <Link to={`/detail/${post.docId}`}>Gå vidare till sidan</Link>
          <Right>
            <Link to={`/update-post/${post.docId}`}>
              <BsPencil />
              Modifiera
            </Link>
            <BtnDeleteNoStyle onClick={() => setShowDeleteModal(true)}>
              <FaTrashAlt /> Radera
            </BtnDeleteNoStyle>
          </Right>
        </Postwrapper>
        {showDeleteModal ? (
          <Modal>
            <ModalContainer>
              <ModalCloseBtn>
                <AiOutlineClose onClick={() => setShowDeleteModal(false)} />
              </ModalCloseBtn>
              <h1>Är du säker på att du vill radera ditt inlägg?</h1>{" "}
              <ButtonDelete onClick={() => handleDelete(post.docId)}>
                Radera
              </ButtonDelete>
            </ModalContainer>
          </Modal>
        ) : null}
        {/* <Buttonwraper>
          <UpdateLink to={`/update-post/${post.docId}`}>
            <BsPencil />
            Modifiera
          </UpdateLink>
          <DeletePost postDocId={post.docId} />
        </Buttonwraper> */}
      </PostContainer>
    </div>
  );
}
