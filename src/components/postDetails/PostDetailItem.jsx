import React, { useEffect, useState } from "react";
import { usePost } from "../../contexts/PostContext";
import { useAuth } from "../../contexts/AuthContext";
import moment from "moment";
import PostCommentList from "./Comments/PostCommentsList";
import * as S from "../styles/DetailPageStyle";
import DeleteModal from "../common/DeleteModal";
import { FaTrashAlt } from "react-icons/fa";

export default function PostDetailItem({ postId }) {
  const { getPostDetailFromDb, postDetail } = usePost();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { userDetail } = useAuth();

  useEffect(() => {
    getPostDetailFromDb(postId);
  }, []);

  return (
    <>
      {postDetail && (
        <S.PostWrapper>
          <S.DateContainer>
            <S.CategoryMark>{postDetail.category}</S.CategoryMark>
            <S.Date>{moment(postDetail.date.toDate()).format("ll")}</S.Date>
          </S.DateContainer>
          <S.Headline>{postDetail.title}</S.Headline>
          <p>{postDetail.text}</p>
          <S.PostedTime>
            {moment(postDetail.date.toDate()).startOf("minutes").fromNow()}
          </S.PostedTime>
          <S.PostedBy>
            <h5>
              -
              {postDetail.anonymousPost ? (
                <span>Anonym</span>
              ) : (
                <span>{postDetail.name}</span>
              )}
            </h5>
          </S.PostedBy>
          {userDetail.admin && (
            <S.DeleteWrapper>
              <S.BtnDeleteNoStyle onClick={() => setShowDeleteModal(true)}>
                {" "}
                <FaTrashAlt />
              </S.BtnDeleteNoStyle>
            </S.DeleteWrapper>
          )}
        </S.PostWrapper>
      )}
      {showDeleteModal ? (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          postDocId={postDetail.docId}
          admin={userDetail.admin}
        />
      ) : null}
      <PostCommentList postId={postId} />
    </>
  );
}
