import React, { useEffect, useState } from "react";
import { usePost } from "../../contexts/PostContext";
import { PostWrapper, Headline, Category } from "../styles/DetailPageStyle";
import { Button } from "../styles/GeneralStyle";
import { useAuth } from "../../contexts/AuthContext";
import moment from "moment";
import PostComment from "./Comments/PostCommentsList";
import CreateComment from "./Comments/CreateComment";
import DeletePost from "../common/DeletePost";

export default function PostDetailItem({ postId }) {
  const { getPostDetailFromDb, postDetail } = usePost();
  // const [showForm, setShowForm] = useState(false);
  const { userDetail } = useAuth();

  useEffect(() => {
    getPostDetailFromDb(postId)

  }, []);

  const toggleCommentForm = () => {
    setShowForm((prev) => !prev);
  };
  return (
    <>
      {postDetail && (
        <PostWrapper>
          <Category>Kategory: {postDetail.category}</Category>
          <Headline>{postDetail.title}</Headline>
          <p>{postDetail.text}</p>
          <p>{moment(postDetail.date.toDate()).startOf("minutes").fromNow()}</p>
          {userDetail.admin ? (
            <DeletePost postDocId={postDetail.docId} />
          ) : null}
        </PostWrapper>
      )}
      {/* {currentUser && (
        <Button onClick={toggleCommentForm}>Lämna en komentar</Button>
      )}
      {showForm && <CreateComment postId={postId} setShowForm={setShowForm} />} */}
      <PostComment postId={postId} />
    </>
  );
}
