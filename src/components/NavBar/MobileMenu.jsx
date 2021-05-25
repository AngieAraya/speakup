import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "./NavbarElements";
import styled from "styled-components";

export default function MobileMenu({ setIsopen, isOpen }) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      // history.push("/start")
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <MobileMenuWrapper className={isOpen ? "open" : ""}>
      <CloseMenu onClick={() => setIsopen(false)}>
        <span />
        <span />
      </CloseMenu>
      <div>
        <NavLink to="/start" onClick={() => setIsopen(false)}>
          Hem
        </NavLink>
        <NavLink to="/about" onClick={() => setIsopen(false)}>
          Om
        </NavLink>
        {currentUser ? (
          <>
            <NavLink to="/profile" onClick={() => setIsopen(false)}>
              Profil
            </NavLink>
            <NavLink onClick={handleLogout} to="/start">
              Logga ut
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/signup" onClick={() => setIsopen(false)}>
              Skapa konto
            </NavLink>
            <NavLink to="/login" onClick={() => setIsopen(false)}>
              Logga in
            </NavLink>
          </>
        )}
      </div>
    </MobileMenuWrapper>
  );
}

const MobileMenuWrapper = styled.div`
  overflow: hidden;
  list-style: none;
  width: 100%;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-100%);
  transition: transform 0.4s ease, opacity 0.1s ease 0.4s;
  position: fixed;
  top: 0;
  left: 0;
  background: #533a56;
  padding: 24px;
  height: 100%;
  margin-top: 0;
  box-sizing: border-box;
  z-index: 10;
  overflow-y: scroll;
  &.open {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0);
    transition: transform 0.4s ease;
  }
  @media (min-width: 800px) {
    display: none;
  }
`;

const CloseMenu = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: flex-end;
  margin: 12px;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  span {
    height: 2px;
    width: 25px;
    background: #a7a7a7;
    margin: -12px;
    border-radius: 5px;
    transform: rotate(-45deg);
    &:last-of-type {
      transform: rotate(45deg);
    }
  }
`;
