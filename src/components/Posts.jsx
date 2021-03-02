import React, { useEffect, useState } from "react";
import {PostWrapper, PostContainer, DateContainer, CategoryMark, TextWrapper, PostedBy} from "../components/styles/StartPageStyle"
import { firestore } from "../firebase";
import { Link } from "react-router-dom";
import moment from 'moment';
import { usePost } from "../contexts/PostContext";
import { useAuth } from "../contexts/AuthContext";
import DeletePost from "./DeletePost";

export default function Posts() {
  // const { comments } = usePost();
  const { userDetail } = useAuth();
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
          {/* <span>{moment(post.date.toDate()).startOf("minutes").fromNow()}</span> */}
          <DateContainer>
          <CategoryMark>{post.category}</CategoryMark>
          <p>{moment(post.date.toDate()).format('ll')}</p>
          </DateContainer>
          <TextWrapper>
          <h1>{post.title}</h1>
          {/* <div>{new Date(post.value.date.seconds * 1000).toLocaleDateString()}</div>
          <div>{new Date(post.value.date.seconds * 1000).toLocaleTimeString()}</div> */}
          <p>{post.text.substring(0, 300) + `...`}</p>
          </TextWrapper>
          <PostedBy>
          <h5>-{post.anonymousPost ? <span>Anonym</span> : <span>{post.name}</span>}</h5>
          </PostedBy>
          {/* {<p>{comments.length} kommentarer</p>} */}
          <Link to={`/detail/${post.docId}`}>Läs mer</Link>
          {userDetail.admin && <DeletePost postDocId={post.docId}/>}
        </PostWrapper>
      ))}
    </PostContainer>
  );
}
