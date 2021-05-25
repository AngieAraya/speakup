import styled from "styled-components";

export const Container = styled.div`
  background: aliceblue;
  min-height: 100vh;
  padding-top: 7%;
`;

export const CategoryMark = styled.div`
  background: #95adbe;
  padding: 0px 12px;
  border: 1px solid #95adbe;
  border-radius: 29px;
  color: white;
  font-size: 15px;
`;

export const DateContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const PostWrapper = styled.div`
  background: #908b8321;
  max-width: 60%;
  padding: 30px 60px 62px;
  border-radius: 14px;
  margin: auto;
`;

export const Headline = styled.h1`
  text-align: center;
  margin: 30px 0 21px;
`;

export const PostedBy = styled.div`
  text-align: right;
  margin-top: 30px;
`;

export const PostedTime = styled.div`
  margin-top: 20px;
  font-style: oblique;
  font-size: 13px;
  color: #625f5f;
`;

export const Date = styled.p`
  font-family: cursive;
    font-style: oblique;
    font-size: 13px;
    color: #625f5f;
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

export const DeleteWrapper = styled.div`
  text-align: right;
`;
