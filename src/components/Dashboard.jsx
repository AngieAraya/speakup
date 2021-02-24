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

  const getPosts = () => {
    firestore
      .collection("posts")
      .where("userId", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ collectionId: doc.id, value: doc.data() });
        });
        setPosts(items);
      })
      .catch((error) => {
        console.log("Error getting documents DASHBOARD: ", error);
      });
  };

  //OBS! funkar denna bätrre ?
  // const getPosts = () => {
  //   setLoading(true)
  //   firestore.collection("posts").doc(currentUser.uid.toString()).collection("userPosts").onSnapshot((querySnapshot) => {
  //     const items = []
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data())
  //     })
  //     console.log("doc", items)
  //     setPosts(items)
  //     setLoading(false)
  //   })
  // }
  useEffect(() => {
    getPosts();
  }, []);

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
          <PostContainer key={post.collectionId}>
            <Postwrapper>
              <h2>{post.value.title}</h2>
              <h5>{post.value.description}</h5>
              <p>{post.value.text.substring(0, 300) + `...`}</p>
              <p>{post.collectionId}</p>
              <Link to={`/detail/${post.collectionId}`}>
                Gå vidare till sidan
              </Link>
            </Postwrapper>
            <Buttonwraper>
              <UpdateLink to={`/update-post/${post.collectionId}`}>
                Modifiera
              </UpdateLink>
              <DeletePost collectionId={post.collectionId} />
            </Buttonwraper>
          </PostContainer>
        ))}
    </DashboardContainer>
  );
}
