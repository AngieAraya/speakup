import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import {
  PostWrapper,
  Headline,
  Category,
  Container,
} from "../components/styles/DetailPageStyle";
import { Button } from "../components/styles/GeneralStyle";
import { useAuth } from "../contexts/AuthContext";
import moment from 'moment';
import PostComment from "../components/PostComments";
import CreateComment from "../components/CreateComment";
import { usePost } from "../contexts/PostContext";

export default function DetailPostPage(props) {
  const { currentUser } = useAuth();
  const { getPostDetailFromDb } = usePost();
  const postId = props.match.params.id;
  const [postDetail, setPostDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);
  // const [comments, setComments] = useState([]);  
  console.log("post id porp", postId);

  // const getPost = () => {
  //   firestore
  //     .collection("posts")
  //     .doc(postId)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         setPostDetail(doc.data());
  //       } else {
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  // };

  useEffect(() => {
    getPostDetailFromDb(postId).then(res =>{
     setPostDetail(res);
    })
  }, []);

  const toggleCommentForm = () => {
    setShowForm((prev) => !prev);
  };

//   if(postDetail)
// {
//   // const m = moment()
//   // const m2 = moment(postDetail.date.toDate())
//   // console.log("to date", postDetail.date.toDate());
//   // console.log("för ish", moment(postDetail.date.toDate()).startOf("minutes").fromNow());
//   // // console.log("fr now", m2.fromNow().locale());
//   // // console.log("calend", moment(postDetail.date.toDate()).calendar());
//   // console.log("locale", m.locale("sv"));
//   // console.log("to moment", moment(postDetail.date.toDate()).locale());
//   // console.log("seconds", new Date(postDetail.date.seconds));
//   // console.log("nanoseconds", new Date(postDetail.date.nanoseconds));
// }

  return (
    <Container>
      {postDetail && (
        <PostWrapper key={postId}>
          <Category>Kategory: {postDetail.category}</Category>
          <Headline>{postDetail.title}</Headline>
          <p>{postDetail.text}</p>
          <p>{moment(postDetail.date.toDate()).startOf("minutes").fromNow()}</p>
        </PostWrapper>
      )}
      {currentUser && (
        <Button onClick={toggleCommentForm}>Lämna en komentar</Button>
      )}
      {showForm && <CreateComment postId={postId} setShowForm={setShowForm} />}
      <PostComment postId={postId} />
    </Container>
  );
}
