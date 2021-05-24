import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import moment from "moment";
import styled from "styled-components";
import DeleteModal from "../common/DeleteModal";

export default function ProfilePost({ post }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div>
      <PostContainer>
        <Postwrapper>
          <ItemRight>{moment(post.date.toDate()).format("ll")}</ItemRight>
          <h2>{post.title}</h2>
          <Text>{post.text.substring(0, 300) + `...`}</Text>
          <FlexSpaceBetween>
            <LinkToDetail to={`/detail/${post.docId}`}>
              Gå till sidan
            </LinkToDetail>
            <div>
              <UpdateLink to={`/update-post/${post.docId}`}>
                <BsPencil />
              </UpdateLink>
              <BtnDeleteNoStyle onClick={() => setShowDeleteModal(true)}>
                <FaTrashAlt />
              </BtnDeleteNoStyle>
            </div>
          </FlexSpaceBetween>
        </Postwrapper>
        {showDeleteModal ? (
          <DeleteModal
            setShowDeleteModal={setShowDeleteModal}
            postDocId={post.docId}
          />
        ) : null}
      </PostContainer>
    </div>
  );
}
export const PostContainer = styled.div`
  display: flex;
`;

export const Postwrapper = styled.div`
  width: 70%;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid purple;
  margin: 30px 5px; 
}
`;

export const Right = styled.div`
  text-align: right;
  }
`;
export const BtnDeleteNoStyle = styled.button`
  border-block-end-style: none;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  &:hover {
    color: #ce2c2ce6;
  }
`;

export const UpdateLink = styled(Link)`
  text-align: center;
  color: black;
  margin-right: 9px;
  &:hover {
    color: #1d89c9;
  }
`;
export const ItemRight = styled.p`
  text-align: right;
  font-family: cursive;
    font-style: oblique;
    font-size: 13px;
    color: #625f5f;
  }
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
export const FlexSpaceBetween = styled.div`
display: flex;
justify-content: space-between;
  }
`;
export const Text = styled.p`
  margin: 10px 0 18px;
  }
`;
