import { useState } from 'react'
import { Container, Form, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/city/' + searchInput)
    setSearchInput('')
  }

  return (
    <div className="py-5 mb-4 text-center">
      <Container fluid>
        <Row>
          <Col>
            <h1 className="display-1">Welcome to Awesome Weather</h1>
            <h2 className="mb-5">Check your city's weather and more!</h2>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Enter a city's name (ex: Milan, IT)"
                className="text-center"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Hero
