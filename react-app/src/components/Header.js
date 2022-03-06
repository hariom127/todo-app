import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
function Header(props) {
  return (
    <Navbar bg="light" expand={false}>
      <Container fluid>
        <Navbar.Brand href="#">TrooTech</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
      </Container>
    </Navbar>
  )
}

export default Header
