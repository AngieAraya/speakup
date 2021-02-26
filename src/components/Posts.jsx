import React, { useEffect, useState } from "react";
import {PostWrapper, Paragraph, PostContainer} from "../components/styles/StartPageStyle"
import { firestore } from "../firebase";
import { Link } from "react-router-dom";
import moment from 'moment';
import { usePost } from "../contexts/PostContext";

export default function Posts() {
  // const { comments } = usePost();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getPostsFromDb = () => {
    setLoading(true);
      firestore.collection("posts").onSnapshot((Snapshot) => {
        const postList = [];
        Snapshot.forEach((doc) => {
          postList.push(doc.data());
        });
        setPosts(postList);
        setLoading(false);
      });
    };

    useEffect(() => {
      getPostsFromDb();
    }, []);
    
    if (loading) {
      return <h1>Loading...</h1>;
    }
    
    return (
      <PostContainer>
      {posts.map((post) => (
        <PostWrapper key={post.docId}>
          <h1>{post.title}</h1>
          <h4>Kategori {post.category}</h4>
          <span>{moment(post.date.toDate()).startOf("minutes").fromNow()}</span>
          <p>{moment(post.date.toDate()).format('ll')}</p>
          {/* <div>{new Date(post.value.date.seconds * 1000).toLocaleDateString()}</div>
          <div>{new Date(post.value.date.seconds * 1000).toLocaleTimeString()}</div> */}
          <h5>Skriven av: {post.anonymousPost ? <span>Anonym</span> : <span>{post.name}</span>}</h5>
          <Paragraph>{post.text}</Paragraph>
          {/* {<p>{comments.length} kommentarer</p>} */}
          <Link to={`/detail/${post.docId}`}>Go to detail page</Link>
        </PostWrapper>
      ))}
    </PostContainer>
  );
}
