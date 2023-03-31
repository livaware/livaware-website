// jest unit test for ChatBot react component
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Logo from '../Logo'

describe('Logo', () => {
  it('renders Logo component in white', () => {
    const snapshot = render(<Logo variant="white" />)
    expect(snapshot).toMatchSnapshot()
  })
  it('renders Logo component in navy', () => {
    const snapshot = render(<Logo variant="navy" />)
    expect(snapshot).toMatchSnapshot()
  })
})
