import { vi } from 'vitest'
import { render } from '@testing-library/react'
import {
  createRoutesStub,
  useLoaderData,
  useRouteLoaderData
} from 'react-router'

import Page from '@/app/routes/games/game'
import type { Route } from './+types/game'
import { useGames } from '@/stores/games'

const uuid = '55a5d47d-6942-4e93-8e19-4ca8c7477ab6'

vi.mock('uuid', () => {
  return {
    v4: vi.fn(() => uuid)
  }
})

describe('/games/:id', () => {
  const PageWithRouter = createRoutesStub([
    {
      path: '/games/:id',
      Component: Page
    }
  ])

  beforeEach(() => {
    useGames
      .getState()
      .start([{ name: 'Howl' }, { name: 'Calisto' }, { name: 'Prince' }])
  })

  it('has heading', async () => {
    const screen = render(
      <PageWithRouter
        hydrationData={{ loaderData: { '0': 'Game 1' } }}
        initialEntries={[`/games/${uuid}`]}
      />
    )

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      'Game'
    )
  })
})
