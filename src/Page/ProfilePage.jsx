import React from 'react'
import {Container} from "../components/styles/ProfilePageStyle"
import Dashboard from '../components/Dashboard'
import UserDetails from '../components/UserDetails'

export default function ProfilePage() {
  return (
    <Container>
     <h2>Profile</h2>
     <UserDetails/>
     <Dashboard/>
    </Container>
  )
}
