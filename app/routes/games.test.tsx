import { render, within } from '@testing-library/react'
import { createRoutesStub } from 'react-router'

import Page, { clientAction } from '@/app/routes/games'
import type { Game } from '@/schemas/game'

describe('/games', () => {
  const PageWithRouter = createRoutesStub([
    {
      path: '/games',
      Component: Page
    }
  ])

  const game: Game = {
    id: 'cf918839-8d71-4b90-a878-c70cd5b2b7c2',
    players: [{ name: 'Calisto' }, { name: 'Howl' }, { name: 'Prince' }],
    rounds: [
      {
        round: 1,
        dealer: 0,
        bidding: [
          { score: 20, bid: 0, actual: 0 },
          { score: 20, bid: 0, actual: 0 },
          { score: 30, bid: 1, actual: 1 }
        ]
      }
    ]
  }

  const hydrationData = {
    loaderData: {
      0: {
        [game.id]: game
      }
    }
  }

  it('has heading', () => {
    const screen = render(
      <PageWithRouter
        initialEntries={['/games']}
        hydrationData={hydrationData}
      />
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Games')
  })

  it('renders list of games', () => {
    const screen = render(
      <PageWithRouter
        initialEntries={['/games']}
        hydrationData={hydrationData}
      />
    )

    const list = screen.getByRole('list', { name: 'Games' })

    expect(within(list).getAllByRole('listitem')).toHaveLength(1)
  })

  it('renders a link to the game', () => {
    const screen = render(
      <PageWithRouter
        initialEntries={['/games']}
        hydrationData={hydrationData}
      />
    )

    const list = screen.getByRole('list', { name: 'Games' })
    expect(within(list).getByRole('link')).toHaveAttribute(
      'href',
      `/games/${game.id}`
    )
  })
})
