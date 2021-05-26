import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px;
`;

export const UserDetaiContainer = styled.div`
  margin: 40px;
`;

export const TextInput = styled.input`
  border-radius: 6px;
  border: 1px solid purple;
  width: 70%;
  min-height: 300px;
  padding: 5px;
  margin: 9px;
`;

export const DashboardContainer = styled.div`
  margin: 50px;
`;

export const LinkDiv = styled.div`
  text-align: center;
`;

export const ProfileImg = styled.img`
  height: 170px;
  border-radius: 50%;
  margin-right: 30px;
`;

export const UserDetailWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

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

export const Buttonwraper = styled.div`
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
    background-color: rgb(127 97 157);
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

export const UpdateLink = styled(Link)`
  letter-spacing: 1px;
  text-decoration: none;
  padding: 3px 55px;
  border: none;
  border-radius: 10px;
  background-color: #38a1bd;
  color: rgb(255, 255, 255);
  cursor: pointer;
  transition: all 0.3s ease 0s;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: #06b9e8;
    color: white;
    text-decoration: none;
  }
`;

export const CreateNewPostLink = styled(UpdateLink)`
  background-color: #38a1bd;
  &:hover {
    background-color: #06b9e8;
  }
`;
export const CancelLink = styled(CreateNewPostLink)`
  background-color: #597f9b;
  &:hover {
    background-color: #95adbe;
  }
`;

export const CancelBtnLink = styled(CreateNewPostLink)`
  background-color: #597f9b;
  padding: 3px 37px;
  margin-left: 15px;
  &:hover {
    background-color: #95adbe;
  }
`;
