import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyNavBar from './components/MyNavBar'
import MyFooter from './components/MyFooter'
import Home from './components/Home'
import City from './components/City'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <header>
          <MyNavBar />
        </header>
        <main className="flex-grow-1 py-5">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<City />} path="/city/:cityId" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </main>
        <footer className="py-4 bg-body-tertiary border-top">
          <MyFooter />
        </footer>
      </BrowserRouter>
    </>
  )
}

export default App

// 543f909786517dea343605c94dcfc7cb <- API key
// X44fXd2syKYT8HBrnweLJHwg6KkAjPNOuqwxJ2TYTlt1EVVqthCz8acu <- Pexels API
