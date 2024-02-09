import { render, screen } from '@testing-library/react'
import App from '../App'

describe('General mounting', () => {
  it('correctly mounts Navbar', () => {
    render(<App />)
    const aboutLink = screen.getByText(/about/i)
    expect(aboutLink).toBeInTheDocument()
  })
})
