import React, { useEffect, useState } from "react";
import {PostWrapper, Paragraph, PostContainer} from "../components/styles/StartPageStyle"
import { firestore } from "../firebase";
import { Link } from "react-router-dom";
import moment from 'moment';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getPosts = () => {
    setLoading(true);
      firestore.collection("posts").onSnapshot((Snapshot) => {
        const items = [];
        Snapshot.forEach((doc) => {
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
      <PostContainer>
      {posts.map((post) => (
        <PostWrapper key={post.collectionId}>
          <h1>{post.value.title}</h1>
          <h4>Kategori {post.value.category}</h4>
          <span>{moment(post.value.date.toDate()).startOf("minutes").fromNow()}</span>
          <p>{moment(post.value.date.toDate()).format('ll')}</p>
          {/* <div>{new Date(post.value.date.seconds * 1000).toLocaleDateString()}</div>
          <div>{new Date(post.value.date.seconds * 1000).toLocaleTimeString()}</div> */}
          {/* <h4>Kategori {post.value.date}</h4> */}
          <h5>Skriven av: {post.value.anonymousPost ? <span>Anonym</span> : <span>{post.value.name}</span>}</h5>
          <Paragraph>{post.value.text}</Paragraph>
          <Link to={`/detail/${post.collectionId}`}>Go to detail page</Link>
        </PostWrapper>
      ))}
    </PostContainer>
  );
}
