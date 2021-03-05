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
import { BsPencil } from "react-icons/bs"
import { FaTrashAlt } from "react-icons/fa"
import ProfilePost from "./ProfilePost";


export default function Dashboard() {
  const { currentUser } = useAuth();
  const { posts, setPosts } = usePost();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  if (loading) {
    return <h1>Loading...</h1>;
  }
  

  return (
    <DashboardContainer>
      {error && <Alert variant="danger">{error}</Alert>}
      <LinkDiv>
        <CreateNewPostLink to="/create-post">skapa inlägg</CreateNewPostLink>
      </LinkDiv>
      {posts &&
        posts.map((post) => (
          <ProfilePost key={post.docId} post={post} />
  
        ))}
    </DashboardContainer>
  );
}
