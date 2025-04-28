import { createRoutesStub } from 'react-router'
import { render } from '@testing-library/react'

import Page from '@/app/routes/home'

describe('/', () => {
  const PageWithRouter = createRoutesStub([
    {
      path: '/',
      Component: Page
    }
  ])

  it('has heading', () => {
    const screen = render(<PageWithRouter initialEntries={['/']} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Wizardly'
    )
  })

  it('has a link to new game', () => {
    const screen = render(<PageWithRouter initialEntries={['/']} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/games/new')
  })
})
