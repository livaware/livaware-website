// unit tests for components inside Typography folder

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Heading from '../Typography/Heading'
import Link from '../Typography/Link'
import Quotation from '../Typography/Quotation'

describe('Heading', () => {
  it('h1 matches snapshot', () => {
    const snapshot = render(<Heading variant="h1">Heading</Heading>)
    expect(screen.getByText('Heading')).toBeInTheDocument()
    expect(snapshot).toMatchSnapshot()
  })
  it('h2 matches snapshot', () => {
    const snapshot = render(<Heading variant="h2">Heading</Heading>)
    expect(screen.getByText('Heading')).toBeInTheDocument()
    expect(snapshot).toMatchSnapshot()
  })
  it('h3 matches snapshot', () => {
    const snapshot = render(<Heading variant="h3">Heading</Heading>)
    expect(screen.getByText('Heading')).toBeInTheDocument()
    expect(snapshot).toMatchSnapshot()
  })
  it('h4 matches snapshot', () => {
    const snapshot = render(<Heading variant="h4">Heading</Heading>)
    expect(screen.getByText('Heading')).toBeInTheDocument()
    expect(snapshot).toMatchSnapshot()
  })
})

describe('Link', () => {
  it('renders Link component', () => {
    const snapshot = render(<Link url="/">Link</Link>)
    expect(screen.getByText('Link')).toBeInTheDocument()
    expect(snapshot).toMatchSnapshot()
  })
})

describe('Quotation', () => {
  it('renders Quotation component', () => {
    const snapshot = render(
      <Quotation text="lorem ipsum" cite="dolores umbridge" />
    )
    expect(screen.getByText('lorem ipsum')).toBeInTheDocument()
    expect(snapshot).toMatchSnapshot()
  })
})
