import { render } from '@testing-library/react'

import Home from '~/routes/home'

describe('/', () => {
  it('renders', () => {
    const screen = render(<Home />)

    expect(screen.getByText('Hello World!')).toBeInTheDocument()
  })
})
