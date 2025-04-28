import { render } from '@testing-library/react'
import { createRoutesStub } from 'react-router'

import Page, { clientAction } from '@/app/routes/games'

describe('/games', () => {
  const PageWithRouter = createRoutesStub([
    {
      path: '/games',
      Component: Page
    }
  ])

  it('has heading', async () => {
    const screen = render(<PageWithRouter initialEntries={['/games']} />)

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      'Games'
    )
  })
})
