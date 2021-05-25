//Form Style for create and update post
import styled from "styled-components";

export const Form = styled.form`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin: 40px auto;
  box-shadow: 7px 5px 14px 2px rgb(0 0 0 / 10%);
  max-width: 711px;
  background: #f6f4f5de;
  max-width: 655px;
  border-radius: 6px;
`;

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 22px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  margin-bottom: 17px;
  @media (min-width: 550px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const TextInput = styled.textarea`
  border-radius: 6px;
  border: 1px solid purple;
  outline: none;
  padding: 7px;
  min-height: 240px;
`;

export const BtnAndInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  /* width: 100%; */
  margin-top: 30px;
  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

export const TitleWrapper = styled.div`
  width: 60%;
`;

export const AnonymousCheck = styled.div`
  margin-top: 19px;
`;

export const AnonymousLabel = styled.label`
  margin-right: 8px;
`;

export const Input = styled.input`
  border-radius: 6px;
  outline: none;
  padding: 5px;
  width: 100%;
  border: 1px solid purple;
`;

export const Button = styled.button`
  letter-spacing: 1px;
  border: none;
  border-radius: 10px;
  padding: 6px 26px;
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
