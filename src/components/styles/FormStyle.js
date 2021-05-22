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
export const Modal = styled.div`
position: fixed; /* Stay in place */
z-index: 1; /* Sit on top */
padding-top: 100px; /* Location of the box */
left: 0;
top: 0;
width: 100%; /* Full width */
height: 100%; /* Full height */
overflow: auto; /* Enable scroll if needed */
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
`;

export const ModalContainer = styled(Container)`
background: #eeeeee;
width: 50%;
margin: auto;
border-radius: 10px;
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

export const Textarea = styled.textarea`
outline: none;
resize: none;
width: 100%;
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
