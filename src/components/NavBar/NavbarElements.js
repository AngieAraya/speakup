import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #322044;
  height: 45px;
  display: flex;
  padding: 5px 2rem;
  z-index: 10;
  align-items: center;
`;

export const NavLink = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  cursor: pointer;
  font-size: 20px;
  margin: 0 0 7px;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: #897f7f;
  }
  &.som {
    color: white;
    &:hover {
      color: white;
    }
    &.active {
      border-bottom: none;
    }
  }
  @media (min-width: 600px) {
    font-size: 16px;
    margin: 0 10px;
    &.active {
      border-bottom: 1px solid white;
    }
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 600px) {
    display: block;
    position: absolute;
    top: -7px;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  white-space: nowrap;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

// export const NavBtn = styled.nav`
// //ANVÄNDS EJ LÄNGRE
//   display: flex;
//   align-items: center;
//   margin-right: 24px;
//   /* Third Nav */
//   /* justify-content: flex-end;
//   width: 100vw; */
//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `;

// export const NavBtnLink = styled(Link)`
//   border-radius: 4px;
//   background: #256ce1;
//   padding: 10px 22px;
//   color: #fff;
//   outline: none;
//   border: none;
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
//   text-decoration: none;
//   margin-left: 24px;
//   &:hover {
//     transition: all 0.2s ease-in-out;
//     background: #fff;
//     color: #010606;
//   }
// `;
