import styled from "styled-components";

export const Button = styled.button`
  letter-spacing: 1px;
  gap: 5px;
  padding: 3px 55px;
  border: none;
  border-radius: 10px;
  background-color: rgb(119 207 191);
  color: rgb(255, 255, 255);
  cursor: pointer;
  transition: all 0.3s ease 0s;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
  justify-content: center;
  display: flex;
  width: 130px;
  padding: 6px 7px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: rgb(79 176 159);
    color: white;
  }
`;

export const DeleteBtn = styled(Button)`
  background-color: #d95f76;
  &:hover {
    background-color: #e05353;
    color: white;
  }
`;

export const CreateCommentBtn = styled(Button)`
  background-color: rgb(185 146 215);
  gap: 0;
  width: 66px;
  &:hover {
    background-color: rgb(159 118 190);
    color: white;
  }
`;

export const CategoryBtn = styled(Button)`
  background-color: rgb(119 150 207);
  &:hover {
    background-color: rgb(137 169 230);
    color: white;
  }
`;

export const CreateCategoryBtn = styled(Button)`
  background-color: rgb(185 146 215);
  gap: 0;
  width: 66px;
  margin-left: 10px;
  &:hover {
    background-color: rgb(159 118 190);
    color: white;
  }
`;

export const CanselBtn = styled(Button)`
  background-color: rgb(94 60 128);
  gap: 0;
  padding: 6px 26px;
  margin-top: 20px;
  width: 97%;
  &:hover {
    background-color: rgb(141 75 206);
    color: white;
  }
`;

export const UpdBtn = styled(Button)`
  background-color: rgb(94 60 128);
  gap: 0;
  padding: 6px 26px;
  margin-top: 20px;
  width: 97%;
  &:hover {
    background-color: rgb(141 75 206);
    color: white;
  }
`;
