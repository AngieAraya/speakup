import { NavLink as Link } from 'react-router-dom';
import styled from "styled-components";

export const Container = styled.div`
  // background: orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px;
`;
export const PostContainer = styled.div`
  // background: pink;
  display: flex;
  // flex-direction: column;
  // justify-content: center;
  // margin: 30px;
`;

export const Postwrapper = styled.div`
  // background: yellow;
  // margin: 30px;
  width: 70%;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid purple;
  margin: 30px 5px; 
}
`;

export const Buttonwraper = styled.div`
  // background: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  
  `;
  export const Button = styled.button`
  letter-spacing: 1px;
  padding: 3px 55px;
  border: none;
  border-radius: 10px;
  background-color: rgb(94 60 128);
  color: rgb(255, 255, 255);
  cursor: pointer;
  transition: all 0.3s ease 0s;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: rgb(141 75 206);
    color: white;
}
`;

  export const ButtonDelete = styled(Button)`
  background-color: darkred;
  &:hover {
    background-color: red;
    color: white;
}
`;
  export const ButtonAdd = styled(Button)`
  background-color: green;
  &:hover {
    background-color: darkgreen;
  }
`;

export const UpdateLink = styled(Link)`
letter-spacing: 1px;
padding: 3px 55px;
border: none;
border-radius: 10px;
background-color: rgb(94 60 128);
color: rgb(255, 255, 255);
cursor: pointer;
transition: all 0.3s ease 0s;
box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
&:hover {
  transition: all 0.2s ease-in-out;
  background-color: rgb(141 75 206);
  color: white;
  text-decoration: none;

}
`;
