import React, { useEffect, useState } from "react";
import {PostWrapper, Paragraph} from "../components/styles/StartPageStyle"
import { firestore } from "../firebase";
import { Link } from "react-router-dom";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getPosts = () => {
    setLoading(true);
    // firestore.collection("posts").doc("IqmEAgmuwqPZeluYETfYY25t7gm1").collection("userPosts").onSnapshot((querySnapshot) => {
      firestore.collection("posts").onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data().anonymousPost);
          // items.push(doc.data());
          items.push({ collectionId: doc.id, value: doc.data() });
        });
        setPosts(items);
        setLoading(false);
      });
    };

    useEffect(() => {
      getPosts();
    }, []);
    
    if (loading) {
      return <h1>Loading...</h1>;
    }
    
    return (
      <>
      {posts.map((post) => (
        <PostWrapper key={post.collectionId}>
          <h1>{post.value.title}</h1>
          <h4>{post.collectionId}</h4>
          <h4>Kategori {post.value.category}</h4>
          <h5>Skriven av: {post.value.anonymousPost ? <span>Anonym</span> : <span>{post.value.name}</span>}</h5>
          <Paragraph>{post.value.text}</Paragraph>
          <Link to={`/detail/${post.collectionId}`}>Go to detail page</Link>
        </PostWrapper>
      ))}
    </>
  );
}
