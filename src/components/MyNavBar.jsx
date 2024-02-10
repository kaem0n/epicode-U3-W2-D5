import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const MyNavBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')
  const [check, setCheck] = useState(Boolean(localStorage.getItem('checked')))

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/city/' + searchInput)
    setSearchInput('')
  }

  const changeTheme = (boolean) => {
    const html = document.getElementsByTagName('html')[0]
    if (boolean === true) {
      localStorage.setItem('checked', check)
      html.setAttribute('data-bs-theme', 'light')
    } else {
      localStorage.clear()
      html.setAttribute('data-bs-theme', 'dark')
    }
  }

  const clear = () => localStorage.clear()

  const handleCheck = () => {
    setCheck(!check)
  }

  useEffect(() => {
    changeTheme(check)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check])

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
            <button className="me-5" onClick={() => clear()}>
              CLEAR LOCALSTORAGE
            </button>
            <Form onSubmit={handleSubmit} className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <i className="fa-solid fa-circle-half-stroke me-1"></i>
                <Form.Switch onChange={() => handleCheck()} checked={check} />
              </div>
              <Form.Control
                type="search"
                placeholder="Search location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="ms-3"
              />
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavBar
