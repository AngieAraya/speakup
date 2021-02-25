import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import DeleteComment from "./DeleteComment";
import {
  CommentWrapper,
  CommentContainer,
  Wrapper,
  CommentedBy,
  Left,
} from "./styles/DetailPageStyle";
import UpdateComment from "./UpdateComment";
import moment from 'moment';


export default function PostComment({comment, postId}) {
  const { userDetail } = useAuth();
  const [ showModal, setShowModal ] = useState(false)

  return (
    <div>
      <CommentWrapper>
        <Left>
            <span>{moment(comment.date.toDate()).startOf("minutes").fromNow()}</span>
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
        {userDetail.uid == comment.userId && (
          <Left>
            <button onClick={() => setShowModal(true)}>Modifiera</button>
            <DeleteComment postId={postId} docId={comment.docId} />
            {showModal ? (
              <UpdateComment
                postId={postId}
                comment={comment}
                setShowModal={setShowModal}
              />
            ) : null}
          </Left>
        )}
      </CommentWrapper>
    </div>
  );
}
