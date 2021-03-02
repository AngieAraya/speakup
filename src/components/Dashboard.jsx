import React, { useEffect, useState } from "react";
import {
  Postwrapper,
  PostContainer,
  Buttonwraper,
  UpdateLink,
  LinkDiv,
  DashboardContainer,
  CreateNewPostLink,
} from "../components/styles/ProfilePageStyle";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";
import DeletePost from "./DeletePost";
import { usePost } from "../contexts/PostContext";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { posts, setPosts } = usePost();
  const [error, setError] = useState("");
  // const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   getUsersPostsFromDb().then(pos => {
  //     setPosts(pos)
  //   })
  // }, []);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("posts")
      .where("userId", "==", currentUser.uid)
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setPosts(data);
      });
    return () => unsubscribe();
  }, []);

  // const getUsersPostsFromDb = () => {
  //   firestore
  //     .collection("posts")
  //     .where("userId", "==", currentUser.uid)
  //     .get()
  //     .then((snapshot) => {
  //       const usersPostList = [];
  //       snapshot.forEach((doc) => {
  //         usersPostList.push(doc.data());
  //         // usersPostList.push({ collectionId: doc.id, value: doc.data() });
  //       });
  //       setPosts(usersPostList);
  //     })
  //     .catch((error) => {
  //       console.log("Error getting documents DASHBOARD: ", error);
  //     });
  // };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <DashboardContainer>
      {error && <Alert variant="danger">{error}</Alert>}
      <LinkDiv> 
      <CreateNewPostLink to="/create-post">
        skapa inlägg
      </CreateNewPostLink>
      </LinkDiv>
      {posts &&
        posts.map((post) => (
          <PostContainer key={post.id}>
            <Postwrapper>
              <h2>{post.title}</h2>
              <h5>{post.description}</h5>
              <p>{post.text.substring(0, 300) + `...`}</p>
              <p>{post.collectionId}</p>
              <Link to={`/detail/${post.docId}`}>
                Gå vidare till sidan
              </Link>
            </Postwrapper>
            <Buttonwraper>
              <UpdateLink to={`/update-post/${post.docId}`}>
                Modifiera
              </UpdateLink>
              <DeletePost postDocId={post.docId} />
            </Buttonwraper>
          </PostContainer>
        ))}
    </DashboardContainer>
  );
}
