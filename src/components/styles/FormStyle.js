import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px auto;
  min-width: 40%;
  align-items: center;
`;
export const Header = styled.h1`
  text-align: center;
`;

export const TextCenter = styled.div`
  text-align: center;
`;

export const Container = styled.div`
  // background: orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
`;
export const Input = styled.input`
  border-radius: 6px;
  // background: yellow;
  margin: 0.3rem;
  border: 1px solid purple;
  width: 70%;
  padding: 5px;
  margin: 9px;
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
  width: 72%;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: rgb(141 75 206);
    color: white;
  }
`;
