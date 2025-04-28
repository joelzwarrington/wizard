import { render } from '@testing-library/react'

import App from './App'

describe('<App />', () => {
  it('renders', () => {
    const screen = render(<App />)
    expect(screen.getByText('Wizard.')).toBeInTheDocument()
  })
})
