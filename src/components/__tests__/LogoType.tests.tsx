import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LogoType from '../LogoType'

describe('LogoType', () => {
  it('renders LogoType component in white', () => {
    const snapshot = render(<LogoType variant="white" />)
    expect(snapshot).toMatchSnapshot()
  })
  it('renders LogoType component in navy', () => {
    const snapshot = render(<LogoType variant="navy" />)
    expect(snapshot).toMatchSnapshot()
  })
})
