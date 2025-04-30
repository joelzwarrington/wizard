import { vi } from 'vitest'
import { render } from '@testing-library/react'
import { createRoutesStub } from 'react-router'

import Page from '@/app/routes/games/game'
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
      Component: () => <Page params={{ id: uuid }} />
    }
  ])

  it('has heading', async () => {
    useGames.setState({
      games: {
        [uuid]: {
          id: uuid,
          datetime: new Date().toISOString(),
          completed: false,
          players: [{ name: 'Howl' }, { name: 'Calisto' }, { name: 'Prince' }],
          rounds: [{ round: 1, step: 'dealing', dealer: 0 }]
        }
      }
    })
    const screen = render(
      <PageWithRouter initialEntries={[`/games/${uuid}`]} />
    )

    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      'Game'
    )
  })
})
