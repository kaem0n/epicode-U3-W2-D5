import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const MyNavBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/city/' + searchInput)
    setSearchInput('')
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="fixed-top bg-body-tertiary">
      <Container>
        <Link className="navbar-brand" to="/">
          <i className="fa-solid fa-cloud-bolt text-primary fs-3"></i> Awesome
          Weather
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link
              className={`nav-link${
                location.pathname === '/' ? ' active' : ''
              }`}
              to="/"
            >
              Home
            </Link>
            <Nav.Link href="https://github.com/kaem0n/epicode-U3-W2-D5">
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavBar
