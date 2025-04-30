import { render, within } from '@testing-library/react'
import { createRoutesStub } from 'react-router'

import Page from '@/app/routes/games'
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
    datetime: '2025-01-01T00:00:00Z',
    completed: false,
    players: [{ name: 'Calisto' }, { name: 'Howl' }, { name: 'Prince' }],
    rounds: [
      {
        round: 1,
        step: 'dealing',
        dealer: 0
      }
    ]
  }

  const hydrationData = {
    loaderData: {
      0: [game]
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

  it('has list of games', () => {
    const screen = render(
      <PageWithRouter
        initialEntries={['/games']}
        hydrationData={hydrationData}
      />
    )

    const list = screen.getByRole('list', { name: 'Games' })

    expect(within(list).getAllByRole('listitem')).toHaveLength(1)
  })

  it('has a link to each game', () => {
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

  it('has game status', () => {
    const screen = render(
      <PageWithRouter
        initialEntries={['/games']}
        hydrationData={hydrationData}
      />
    )

    const listitem = screen.getByRole('listitem')
    expect(within(listitem).getByText('In progress')).toBeInTheDocument()
  })
})
