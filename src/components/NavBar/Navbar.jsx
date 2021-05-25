import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import MobileMenu from "./MobileMenu";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";

export default function Navbar() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsopen] = useState(false);

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
      <Nav>
        <NavLink className="som" to="/start">
          <h1>SpeakUP</h1>
        </NavLink>
        <Bars onClick={() => setIsopen(!isOpen)} />
        <NavMenu>
          <NavLink to="/start">Hem</NavLink>
          <NavLink to="/about">Om</NavLink>
          {currentUser ? (
            <>
              <NavLink to="/profile">Profil</NavLink>
              <NavLink className="som" onClick={handleLogout} to="/start">
                Logga ut
              </NavLink>
            </>
          ) : (
            <>
              {" "}
              <NavLink to="/signup">Skapa konto</NavLink>
              <NavLink to="/login">Logga in</NavLink>
            </>
          )}
        </NavMenu>
      </Nav>
      {<MobileMenu setIsopen={setIsopen} isOpen={isOpen} />}
    </>
  );
}
