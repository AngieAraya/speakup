import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";
import DeleteModal from "../common/DeleteModal";

export const CategoryMark = styled.div`
background: #566180;
padding: 0px 12px;
border: 1px solid #565558;
border-radius: 29px;
color: white;
`;

export const DateContainer = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`;
export const TextWrapper = styled.div`
text-align: center;
margin: 20px;
`;

export const PostedBy = styled.div`
text-align: right;
`;

export const PostWrapper = styled.div`
  background-color: #ffffffbf;
  max-width: 55%;
  border-radius: 5px;
  margin: 80px  auto;
  padding: 9px 25px;
  box-shadow: 8px 10px 15px -3px rgba(0,0,0,0.38);
`;


export const LinkToDetail = styled(Link)`
  text-decoration: none;
  border: 1px solid #b78db7;
  padding: 3px 6px;
  border-radius: 3px;
  color: black;
  font-size: 12px;
  &:hover{
    background-color: #b78db7;
    color: white;
  }
}
`;

export const Date = styled.p`
  font-family: cursive;
    font-style: oblique;
    font-size: 13px;
    color: #625f5f;
  }
`;

export default function Post({ post }) {
  const { userDetail } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const checkUserDetail = () => {
    if (userDetail) {
      if (userDetail.admin) {
        return  (<button onClick={() => setShowDeleteModal(true)}>
        Delete Post
      </button>)
      } 
    }
  };

  return (
    <>
      <PostWrapper>
        {/* <span>{moment(post.date.toDate()).startOf("minutes").fromNow()}</span> */}
        <DateContainer>
          <CategoryMark>{post.category}</CategoryMark>
          <Date>{moment(post.date.toDate()).format("ll")}</Date>
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
        <LinkToDetail to={`/detail/${post.docId}`}>Läs mer</LinkToDetail>
        <div>
          {/* {userDetail.admin && <DeletePost postDocId={post.docId} />} */}
          {/* {userDetail.admin && (
            <button onClick={() => setShowDeleteModal(true)}>
              Delete Post
            </button>
          )} */}
        </div>
        {checkUserDetail()}
        {showDeleteModal ? ( <DeleteModal setShowDeleteModal={setShowDeleteModal} postDocId={post.docId}/>
        ) : null}
      </PostWrapper>
    </>
  );
}
