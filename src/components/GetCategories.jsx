import React, { useEffect, useState } from "react";
import { PostWrapper, Paragraph } from "../components/styles/StartPageStyle";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";

export default function GetCategories({ radio }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetCategory = () => {
    setLoading(true);
    console.log(radio);
    firestore
      .collection("posts")
      .where("category", "==", radio)
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ collectionId: doc.id, value: doc.data() });
        });
        setPosts(items);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting documents DASHBOARD: ", error);
      });
  };

  useEffect(() => {
    handleGetCategory();
  }, [radio]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>{radio}</h1>
      {posts.map((post) => (
        <PostWrapper key={post.collectionId}>
          <h1>{post.value.title}</h1>
          <h4>{post.collectionId}</h4>
          <h4>Kategori {post.value.category}</h4>
          <h5>Skriven av: {post.value.name}</h5>
          <Paragraph>{post.value.text}</Paragraph>
          <Link to={`/detail/${post.collectionId}`}>Go to detail page</Link>
        </PostWrapper>
      ))}
    </>
  );
}
