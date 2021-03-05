import React, { useState } from "react";
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
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import DeleteModal from "../common/DeleteModal";

export const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  display: flex;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const ModalContainer = styled.div`
  background: #eeeeee;
  width: 50%;
  margin: auto;
  border-radius: 10px;
  min-height: 14%;
  padding: 28px;
  text-align: center;
`;
export const ModalCloseBtn = styled.div`
  text-align: right;
  cursor: pointer;
  &:hover {
    color: #4e746a;
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
          // <Modal>
          //   <ModalContainer>
          //     <ModalCloseBtn>
          //       <AiOutlineClose onClick={() => setShowDeleteModal(false)} />
          //     </ModalCloseBtn>
          //     <h1>Är du säker på att du vill radera inlägget?</h1>{" "}
          //     <DeletePost postDocId={post.docId} />
          //   </ModalContainer>
          // </Modal>
        ) : null}
      </PostWrapper>
    </>
  );
}
