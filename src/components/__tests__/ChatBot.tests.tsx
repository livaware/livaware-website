// jest unit test for ChatBot react component
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ChatBot from '../ChatBot'

describe('ChatBot', () => {
  it('renders ChatBot component', () => {
    const snapshot = render(<ChatBot apiEndpoint="/test" />)
    expect(screen.getByText('Ask Livaware')).toBeInTheDocument()
    expect(snapshot).toMatchSnapshot()
  })
})
