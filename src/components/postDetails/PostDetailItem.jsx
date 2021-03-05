import React, { useEffect, useState } from "react";
import { usePost } from "../../contexts/PostContext";
import { PostWrapper, Headline, Category } from "../styles/DetailPageStyle";
import { Button } from "../styles/GeneralStyle";
import { useAuth } from "../../contexts/AuthContext";
import moment from "moment";
import PostComment from "./Comments/PostCommentsList";
import CreateComment from "./Comments/CreateComment";
import DeletePost from "../common/DeletePost";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import DeleteModal from "../common/DeleteModal";

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

export default function PostDetailItem({ postId }) {
  const { getPostDetailFromDb, postDetail } = usePost();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // const [showForm, setShowForm] = useState(false);
  const { userDetail } = useAuth();

  useEffect(() => {
    getPostDetailFromDb(postId);
  }, []);

  // const toggleCommentForm = () => {
  //   setShowForm((prev) => !prev);
  // };
  return (
    <>
      {postDetail && (
        <PostWrapper>
          <Category>Kategory: {postDetail.category}</Category>
          <Headline>{postDetail.title}</Headline>
          <p>{postDetail.text}</p>
          <p>{moment(postDetail.date.toDate()).startOf("minutes").fromNow()}</p>
          {/* {userDetail.admin ? (
            <DeletePost postDocId={postDetail.docId} admin={userDetail.admin} />
          ) : null} */}
          {userDetail.admin && (
            <button onClick={() => setShowDeleteModal(true)}>
              Delete Post
            </button>
          )}
        </PostWrapper>
      )}
      {showDeleteModal ? ( <DeleteModal setShowDeleteModal={setShowDeleteModal} postDocId={postDetail.docId} admin={userDetail.admin} />
        // <Modal>
        //   <ModalContainer>
        //     <ModalCloseBtn>
        //       <AiOutlineClose onClick={() => setShowDeleteModal(false)} />
        //     </ModalCloseBtn>
        //     <h1>Är du säker på att du vill radera inlägget?</h1>{" "}
        //     <DeletePost postDocId={postDetail.docId} admin={userDetail.admin} />
        //   </ModalContainer>
        // </Modal>
      ) : null}
      {/* {currentUser && (
        <Button onClick={toggleCommentForm}>Lämna en komentar</Button>
      )}
      {showForm && <CreateComment postId={postId} setShowForm={setShowForm} />} */}
      <PostComment postId={postId} />
    </>
  );
}
