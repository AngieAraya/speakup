import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import {
  PostWrapper,
  Headline,
  Category,
  Container,
} from "../components/styles/DetailPageStyle";
// import { Button } from "../components/styles/GeneralStyle";
// import { useAuth } from "../contexts/AuthContext";
// import moment from 'moment';
// import PostComment from "../components/postDetails/Comments/PostCommentsList";
// import CreateComment from "../components/postDetails/Comments/CreateComment";
// import { usePost } from "../contexts/PostContext";
// import DeletePost from "../components/DeletePost";
import PostDetailItem from "../components/postDetails/PostDetailItem";

export default function DetailPostPage(props) {
  // const { currentUser, userDetail } = useAuth();
  // const { getPostDetailFromDb } = usePost();
  const postId = props.match.params.id;
  // const [postDetail, setPostDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // useEffect(() => {
  //   getPostDetailFromDb(postId).then(res =>{
  //    setPostDetail(res);
  //   })
  // }, []);

  // const toggleCommentForm = () => {
  //   setShowForm((prev) => !prev);
  // };


  return (
    <Container>
        <PostDetailItem  key={postId} postId={postId}/>
      {/* {currentUser && (
        <Button onClick={toggleCommentForm}>Lämna en komentar</Button>
      )}
      {showForm && <CreateComment postId={postId} setShowForm={setShowForm} />}
      <PostComment postId={postId} /> */}
    </Container>
  );
}
