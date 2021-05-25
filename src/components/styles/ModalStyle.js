import styled from "styled-components";

export const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  display: flex;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 320px;
  margin: 40px auto 10px;
`;

export const ModalCloseBtn = styled.div`
  text-align: right;
  cursor: pointer;
  &:hover {
    color: #4e746a;
  }
`;

// export const Modal = styled.div`
//   position: fixed; /* Stay in place */
//   z-index: 1; /* Sit on top */
//   padding-top: 100px; /* Location of the box */
//   left: 0;
//   top: 0;
//   width: 100%; /* Full width */
//   height: 100%; /* Full height */
//   overflow: auto; /* Enable scroll if needed */
//   background-color: rgb(0, 0, 0); /* Fallback color */
//   background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
// `;

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
