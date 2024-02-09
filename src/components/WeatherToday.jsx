import { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const cities = [
  "L'Aquila",
  'Potenza',
  'Catanzaro',
  'Napoli',
  'Bologna',
  'Trieste',
  'Roma',
  'Genova',
  'Milano',
  'Ancona',
  'Campobasso',
  'Torino',
  'Bari',
  'Cagliari',
  'Palermo',
  'Firenze',
  'Trento',
  'Perugia',
  'Aosta',
  'Venezia',
]

const urlAPI = '&appid=543f909786517dea343605c94dcfc7cb'

const WeatherToday = () => {
  const [locationData, setLocationData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getLocationData = () => {
    cities.forEach(async (city) => {
      try {
        const res = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=' +
            city +
            ',it' +
            urlAPI +
            '&units=metric'
        )
        if (res.ok) {
          const data = await res.json()
          setLocationData((current) => [...current, data])
        } else {
          throw new Error(res.status)
        }
      } catch (err) {
        console.log(err)
      }
    })
  }

  useEffect(() => {
    getLocationData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (locationData.length === 20) {
      setIsLoading(false)
    }
  }, [locationData])

  return (
    <Container>
      <h3>Weather Today: Italy</h3>
      <Row className="justify-content-center">
        {isLoading ? (
          <div className="text-center py-5">
            <Spinner variant="border" />
          </div>
        ) : (
          locationData.map((city) => {
            return (
              <Col xs={12} md={6} lg={5} key={city.id} className="py-2">
                <Link
                  to={`/city/${fixName(city.name)},it`}
                  className="bg-primary-subtle border py-2 px-3 d-flex justify-content-between align-items-center rounded-3 pointer custom-link link-underline link-underline-opacity-0"
                >
                  <p className="m-0 fw-semibold">{fixName(city.name)}</p>
                  <div>
                    <span>{formatTemp(city.main.temp)}°C</span>
                    <img
                      src={`https://openweathermap.org/img/wn/${city.weather[0].icon}.png`}
                      alt={city.weather[0].id}
                    />
                  </div>
                </Link>
              </Col>
            )
          })
        )}
      </Row>
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

const fixName = (str) => {
  let text = str
  if (str.includes('Provincia di ')) {
    text = str.replace('Provincia di ', '')
  } else if (str.includes('Province of ')) {
    text = str.replace('Province of ', '')
  } else if (str === "Valle d'Aosta") {
    text = 'Aosta'
  }
  return text
}

export default WeatherToday
