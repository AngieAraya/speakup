import React, { useEffect, useState } from "react";
import { usePost } from "../../contexts/PostContext";
import { useAuth } from "../../contexts/AuthContext";
import moment from "moment";
import PostCommentList from "./Comments/PostCommentsList";
import styled from "styled-components";
import DeleteModal from "../common/DeleteModal";

export const CategoryMark = styled.div`
background: #566180;
padding: 0px 12px;
border: 1px solid #565558;
border-radius: 29px;
color: white;
`;

export const DateContainer = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`;

export const PostWrapper = styled.div`
  background: #908b8321;
  max-width: 60%;
  padding: 30px 60px 62px;
  border-radius: 14px;
  margin: auto;
`;

export const Headline = styled.h1`
  text-align: center;
  margin: 30px 0 21px;
`;

export const PostedBy = styled.div`
  text-align: right;
  margin-top: 30px;
`;

export const Date = styled.p`
  font-family: cursive;
    font-style: oblique;
    font-size: 13px;
    color: #625f5f;
  }
`;

export default function PostDetailItem({ postId }) {
  const { getPostDetailFromDb, postDetail } = usePost();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
          <DateContainer>
            <CategoryMark>{postDetail.category}</CategoryMark>
            <Date>{moment(postDetail.date.toDate()).format("ll")}</Date>
          </DateContainer>
          <Headline>{postDetail.title}</Headline>
          <p>{postDetail.text}</p>
          <p>{moment(postDetail.date.toDate()).startOf("minutes").fromNow()}</p>
          <PostedBy>
            <h5>
              -
              {postDetail.anonymousPost ? (
                <span>Anonym</span>
              ) : (
                <span>{postDetail.name}</span>
              )}
            </h5>
          </PostedBy>
          {userDetail.admin && (
            <button onClick={() => setShowDeleteModal(true)}>
              Delete Post
            </button>
          )}
        </PostWrapper>
      )}
      {showDeleteModal ? (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          postDocId={postDetail.docId}
          admin={userDetail.admin}
        />
      ) : null}
      {/* {currentUser && (
        <Button onClick={toggleCommentForm}>Lämna en komentar</Button>
      )}
      {showForm && <CreateComment postId={postId} setShowForm={setShowForm} />} */}
      <PostCommentList postId={postId} />
    </>
  );
}
