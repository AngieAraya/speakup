import React from 'react'
import header from'../../img/headerImg.jpg';
import styled from "styled-components";

export const Image = styled.img`
 width: 100%;
 height: 80vh;
`;

export default function Header() {
  return (
    <div>
      <Image src={header} alt="Purple Image"/>
    </div>
  )
}
