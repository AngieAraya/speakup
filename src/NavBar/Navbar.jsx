import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  Nav,
  NavLink,
  // Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements' 

export default function Navbar() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  console.log('nav', currentUser);

  async function handleLogout() {
    setError("")

    try {
      await logout()
      // history.push("/start")
    } catch {
      setError("Failed to log out")
    }
  }




  return (
    <>
    {currentUser ?   <Nav>
    <NavLink to="/">
      <h1>Speak UP</h1>
    </NavLink>
    {/* <Bars/> */}
    <NavMenu>
    <NavLink to="/start" >
      Hem
    </NavLink>
    <NavLink to="/about" >
      Om
    </NavLink>
    <NavLink to="/" >
      Profil
    </NavLink>
    </NavMenu>
    <NavBtn>
    <NavBtnLink onClick={handleLogout} to="/start" >Logga ut</NavBtnLink>
    </NavBtn>

  </Nav>
  :
  <Nav>
    <NavLink to="/">
      <h1>Speak UP</h1>
    </NavLink>
    {/* <Bars/> */}
    <NavMenu>
    <NavLink to="/" >
      Hem
    </NavLink>
    <NavLink to="/about" >
      About
    </NavLink>
    <NavLink to="/signup" >
      Skapa konto
    </NavLink>
    </NavMenu>
    <NavBtn>
    <NavBtnLink to="/login">Logga in</NavBtnLink>
    </NavBtn>

  </Nav>

  
  } 

      
    </>
  )
}
