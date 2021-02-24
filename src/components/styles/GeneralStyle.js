import { NavLink as Link } from 'react-router-dom';
import styled from "styled-components";

export const Container = styled.div`
 background: aliceblue;
 display: flex;
 flex-direction: column;
 align-items: center;
//  background: rgb(150 132 132);

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