import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

export default function Navbar() {
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
    <>
      {currentUser ? (
        <Nav>
          <NavLink to="/start">
            <h1>Speak UP</h1>
          </NavLink>
          <Bars/>
          <NavMenu>
            <NavLink to="/start">Hem</NavLink>
            <NavLink to="/about">Om</NavLink>
            <NavLink to="/profile">Profil</NavLink>
            <NavLink onClick={handleLogout} to="/start">
              Logga ut
            </NavLink>
          </NavMenu>
        </Nav>
      ) : (
        <Nav>
          <NavLink to="/start">
            <h1>Speak UP</h1>
          </NavLink>
          <Bars/>
          <NavMenu>
            <NavLink to="/start">Hem</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/signup">Skapa konto</NavLink>
            <NavLink to="/login">Logga in</NavLink>
          </NavMenu>
        </Nav>
      )}
    </>
  );
}
