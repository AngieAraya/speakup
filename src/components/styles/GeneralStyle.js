import { NavLink as Link } from 'react-router-dom';
import styled from "styled-components";

export const Container = styled.div`
 background: aliceblue;
 display: flex;
 flex-direction: column;
 align-items: center;
//  background: rgb(150 132 132);

`;
export const SocialBtnContainer = styled.div`
margin: 20px auto;
min-width: 40%;
`;

export const Button = styled.button`
  letter-spacing: 1px;
  border: none;
  border-radius: 10px;
  padding: 6px 26px;
  background-color: rgb(94 60 128);
  color: rgb(255, 255, 255);
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease 0s;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
  width: 22%;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: rgb(141 75 206);
    color: white;
  }
`;

export const FbBtn = styled.button`
/* Facebook */
background-color: rgb(56, 84, 153);
color: rgb(255, 255, 255);
border: none;
display: flex;
justify-content: center;
align-items: center;
border-radius: 10px;
padding: 7px 25px;
width: 100%;
&:hover{
  background-color: rgb(56 84 153 / 89%)
}
`;
export const GoogleBtn = styled.button`
/* Google */
background-color: rgb(255, 255, 255);
color: rgb(255, 255, 255);
border: 1px solid rgb(214, 217, 220);
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 10px;
padding: 7px 25px;
width: 100%;
margin-bottom: 20px;
&:hover{
  background-color: rgb(238 236 236)
}
`;
export const SocialText = styled.span`
margin-left: 8px;
font-size: 15px;
font-family: Roboto, sans-serif;


`;
export const SocialGoogleText = styled.span`
margin-left: 8px;
font-family: Roboto, sans-serif;
    opacity: 0.54;
    font-size: 15px;
    color: rgb(0, 0, 0);
    
`;