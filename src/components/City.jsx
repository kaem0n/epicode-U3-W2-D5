import { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const City = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [cityData, setCityData] = useState(null)
  const [bg, setBg] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${params.cityId}&appid=543f909786517dea343605c94dcfc7cb&units=metric`
      )
      if (res.ok) {
        const data = await res.json()
        setCityData(data)
        setIsLoading(false)
      } else {
        throw new Error(res.status)
      }
    } catch (err) {
      console.log(err)
      navigate('not-found')
    }
  }

  const getBgImg = async () => {
    try {
      const res = await fetch(
        'https://api.pexels.com/v1/search?query=' + params.cityId,
        {
          method: 'GET',
          headers: {
            Authorization:
              'X44fXd2syKYT8HBrnweLJHwg6KkAjPNOuqwxJ2TYTlt1EVVqthCz8acu',
          },
        }
      )
      if (res.ok) {
        const data = await res.json()
        setBg(data.photos[0].src.original)
      } else {
        throw new Error(res.status)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
    getBgImg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return (
    <Container
      className="p-lg-5 h-75 contain"
      fluid
      style={{
        background: `linear-gradient(0deg, var(--bs-body-bg) 0%, rgba(0,0,0,0) 60%), ${
          bg ? `url(${bg})` : 'var(--bs-primary-bg-subtle)'
        }`,
      }}
    >
      {isLoading ? (
        <div className="text-center py-5 my-5">
          <Spinner variant="border" />
        </div>
      ) : (
        <>
          <Row className="h-100 align-items-end px-2 px-lg-5 mb-5">
            <Col>
              <div className="d-flex align-items-center">
                <h1 className="m-0">
                  Weather in {cityData.name} ({cityData.sys.country})
                </h1>
                <img
                  src={`https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
                  alt=""
                />
              </div>
              <h3>
                {cityData.weather[0].main} ({cityData.weather[0].description}) |{' '}
                {formatTemp(cityData.main.temp)} °C
              </h3>
            </Col>
          </Row>
          <Row className="text-center justify-content-center">
            <Col xs={4} md={3}>
              <h5>MAX: {formatTemp(cityData.main.temp_max)} °C</h5>
            </Col>
            <Col xs={4} md={3}>
              <h5>MIN: {formatTemp(cityData.main.temp_min)} °C</h5>
            </Col>
            <Col xs={4} md={3}>
              <h5>Perceived: {formatTemp(cityData.main.feels_like)} °C</h5>
            </Col>
          </Row>
          <Row className="text-center justify-content-center">
            <Col xs={4} md={3}>
              <h5>Humidity: {cityData.main.humidity}%</h5>
            </Col>
            <Col xs={4} md={3}>
              <h5>Pressure: {cityData.main.pressure} hPa</h5>
            </Col>
            <Col xs={4} md={3}>
              <h5>Wind: {formatTemp(cityData.wind.speed)} km/h</h5>
            </Col>
          </Row>
          <Row className="text-center justify-content-center">
            <Col xs={4} md={3}>
              <h5>Sunset: {getTime(cityData.sys.sunset)} (UTC)</h5>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

const formatTemp = (n) => {
  let str = String(n)
  if (str.indexOf('.') !== -1) {
    const temp = str.split('.')
    if (temp[1].length === 2) {
      temp[1] = temp[1].slice(0, 1)
    }
    str = temp.join('.')
  } else {
    str += '.0'
  }
  return str
}

const getTime = (ms) => {
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes

  return hours + ':' + minutes
}

export default City
