import { vi } from 'vitest'
import { render } from '@testing-library/react'
import {
  createRoutesStub,
  useLoaderData,
  useRouteLoaderData
} from 'react-router'

import Page from '@/app/routes/games/game'
import type { Route } from './+types/game'

describe('/games/:id', () => {
  const PageWithRouter = createRoutesStub([
    {
      path: '/games/:id',
      Component: Page
    }
  ])

  it('has heading', async () => {
    const screen = render(
      <PageWithRouter
        hydrationData={{ loaderData: { '0': 'Game 1' } }}
        initialEntries={['/games/1']}
      />
    )

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      'Game 1'
    )
  })
})
