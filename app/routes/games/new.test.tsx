import { render } from '@testing-library/react'
import { createRoutesStub } from 'react-router'

import Page from '@/app/routes/games/new'

describe('/games/new', () => {
  const PageWithRouter = createRoutesStub([
    {
      path: '/games/new',
      Component: Page
    }
  ])

  it('has heading', () => {
    const screen = render(<PageWithRouter initialEntries={['/games/new']} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'New game'
    )
  })
})
