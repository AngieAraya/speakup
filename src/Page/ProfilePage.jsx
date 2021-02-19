import React from 'react'
import { Container } from "../components/styles/ProfilePageStyle"
import Dashboard from '../components/Dashboard'
import UserDetails from '../components/UserDetails'
import styled from "styled-components";

export default function ProfilePage() {
  return (
    <Container>
     <h1>Profile Page</h1>
     <UserDetails/>
     <Dashboard/>
    </Container>
  )
}
