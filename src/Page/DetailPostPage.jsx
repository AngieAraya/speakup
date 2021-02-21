import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import {
  PostWrapper,
  Headline,
  Category,
} from "../components/styles/DetailPageStyle";
import { Container, Button } from "../components/styles/GeneralStyle";
import { useAuth } from "../contexts/AuthContext";
import PostComment from "../components/PostComment";
import CreateComment from "../components/CreateComment";

export default function DetailPostPage(props) {
  const { currentUser } = useAuth();
  const postId = props.match.params.id;
  const [postDetail, setPostDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [reloadComment, setReloadComment] = useState(false);

  const getPost = () => {
    firestore
      .collection("posts")
      .doc(postId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setPostDetail(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  const toggleCommentForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <Container>
      {postDetail && (
        <PostWrapper key={postId}>
          <Category>Kategory: {postDetail.category}</Category>
          <Headline>{postDetail.title}</Headline>
          <p>{postDetail.text}</p>
          {/* <p>{postDetail.date.seconds}</p> */}
        </PostWrapper>
      )}
      {currentUser && (
        <Button onClick={toggleCommentForm}>Lämna en komentar</Button>
      )}
      {showForm && <CreateComment postId={postId} setShowForm={setShowForm}/>}
      <h3>Kommentarer</h3>
      <PostComment postId={postId}/>
    </Container>
  );
}
