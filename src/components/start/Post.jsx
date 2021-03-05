import React from 'react'
import { Link } from "react-router-dom";
import moment from "moment";
import DeletePost from "../common/DeletePost";
import {
  PostWrapper,
  DateContainer,
  CategoryMark,
  TextWrapper,
  PostedBy,
} from "../styles/StartPageStyle";
import { useAuth } from "../../contexts/AuthContext";

export default function Post({post}) {
  const { userDetail } = useAuth();

  return (
    <>
      <PostWrapper>
          {/* <span>{moment(post.date.toDate()).startOf("minutes").fromNow()}</span> */}
          <DateContainer>
            <CategoryMark>{post.category}</CategoryMark>
            <p>{moment(post.date.toDate()).format("ll")}</p>
          </DateContainer>
          <TextWrapper>
            <h1>{post.title}</h1>
            {/* <div>{new Date(post.value.date.seconds * 1000).toLocaleDateString()}</div>
          <div>{new Date(post.value.date.seconds * 1000).toLocaleTimeString()}</div> */}
            <p>{post.text.substring(0, 300) + `...`}</p>
          </TextWrapper>
          <PostedBy>
            <h5>
              -
              {post.anonymousPost ? (
                <span>Anonym</span>
              ) : (
                <span>{post.name}</span>
              )}
            </h5>
          </PostedBy>
          {/* {<p>{comments.length} kommentarer</p>} */}
          <Link to={`/detail/${post.docId}`}>Läs mer</Link>
          {userDetail.admin && <DeletePost postDocId={post.docId} />}
        </PostWrapper>
      
    </>
  )
}
