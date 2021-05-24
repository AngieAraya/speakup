import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";
import { usePost } from "../../contexts/PostContext";
import ProfilePost from "./ProfilePost";
import styled from "styled-components";

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
      <div>
        <CreatePostLink to="/create-post">Skapa inlägg</CreatePostLink>
      </div>
      {posts &&
        posts.map((post) => <ProfilePost key={post.docId} post={post} />)}
    </DashboardContainer>
  );
}

export const DashboardContainer = styled.div`
  margin: 50px;
`;

export const CreatePostLink = styled(Link)`
text-decoration: none;
border: 1px solid #b78db7;
padding: 4px 15px;
border-radius: 3px;
color: black;
background: #b78db7;
color: white;
  &:hover{
    background-color: #c9aac9;
    color: white;
  }
}
`;
