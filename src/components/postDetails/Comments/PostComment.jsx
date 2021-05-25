import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import DeleteComment from "../../common/DeleteComment";
import UpdateComment from "./UpdateComment";
import moment from "moment";
import styled from "styled-components";
import { BsPencil } from "react-icons/bs";

export default function PostComment({ comment, postId }) {
  const { userDetail } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const renderCurrentUserOptionsBtns = () => {
    return (
      userDetail.id == comment.userId && (
        <Left>
          <BtnNoStyle onClick={() => setShowModal(true)}>
            <BsPencil />
          </BtnNoStyle>
          <DeleteComment postId={postId} docId={comment.docId} />
          {showModal ? (
            <UpdateComment
              postId={postId}
              comment={comment}
              setShowModal={setShowModal}
            />
          ) : null}
        </Left>
      )
    );
  };

  return (
    <div>
      <CommentWrapper>
        <Left>
          <span>
            {moment(comment.date.toDate()).startOf("minutes").fromNow()}
          </span>
        </Left>
        <Wrapper>
          <CommentedBy>
            {comment.anonymousPost ? (
              <span>Anonym</span>
            ) : (
              <span>{comment.name}</span>
            )}
          </CommentedBy>
          <p>{comment.text}</p>
        </Wrapper>
        {renderCurrentUserOptionsBtns()}
        {userDetail.admin && (
          <Left>
            <DeleteComment postId={postId} docId={comment.docId} />
          </Left>
        )}
      </CommentWrapper>
    </div>
  );
}

export const Left = styled.div`
  text-align: right;
`;

export const Wrapper = styled.div`
  display: flex;
  padding: 10px;
`;

export const CommentedBy = styled.span`
  margin: 10px 40px;
`;

export const CommentWrapper = styled.div`
  border-bottom: 1px solid black;
  padding: 10px;
`;

export const BtnNoStyle = styled.button`
  border-block-end-style: none;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  margin-right: 9px;
  &:hover {
    color: #1d89c9;
  }
`;
