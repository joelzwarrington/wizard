import type { Game } from '@/schemas/game'
import { useGames } from '@/stores/games'

const uuid = '55a5d47d-6942-4e93-8e19-4ca8c7477ab6'

vi.mock('uuid', () => {
  return {
    v4: vi.fn(() => uuid)
  }
})

describe('useGames', () => {
  it('starts game and returns uuid', () => {
    const id = useGames.getState().start([{ name: 'Joel' }])
    expect(id).toEqual(uuid)
    expect(useGames.getState().currentGame()).toMatchObject({
      id: uuid,
      players: [{ name: 'Joel' }]
    })
  })

  it('advances', () => {
    vi.setSystemTime(new Date('2025-01-01T00:00:00.000Z'))

    const id = useGames
      .getState()
      .start([
        { name: 'Rory' },
        { name: 'Calisto' },
        { name: 'Howl' },
        { name: 'Prince' }
      ])

    const expected: Partial<Game> = {
      id: uuid,
      datetime: '2025-01-01T00:00:00.000Z',
      completed: false,
      players: [
        { name: 'Rory' },
        { name: 'Calisto' },
        { name: 'Howl' },
        { name: 'Prince' }
      ],
      rounds: [{ dealer: expect.any(Number), round: 1, step: 'dealing' }]
    }

    let game = useGames.getState().currentGame()
    expect(game).toMatchObject(expected)

    useGames.getState().advance({ from: 'dealing', trump: 'Heart' })

    expect(useGames.getState().currentGame()).toMatchObject({
      ...expected,
      rounds: [
        {
          dealer: game!.rounds![0].dealer,
          round: 1,
          step: 'bidding',
          trump: 'Heart'
        }
      ]
    })

    useGames.getState().advance({ from: 'bidding', bids: [0, 1, 2, 3] })

    expect(useGames.getState().currentGame()).toMatchObject({
      ...expected,
      rounds: [
        {
          round: 1,
          dealer: game!.rounds![0].dealer,
          step: 'scoring',
          trump: 'Heart',
          bidding: [{ bid: 0 }, { bid: 1 }, { bid: 2 }, { bid: 3 }]
        }
      ]
    })

    useGames.getState().advance({ from: 'scoring', tricks: [3, 1, 2, 0] })

    expect(useGames.getState().currentGame()).toMatchObject({
      ...expected,
      rounds: [
        {
          round: 1,
          dealer: game!.rounds![0].dealer,
          step: 'completed',
          trump: 'Heart',
          bidding: [
            { bid: 0, actual: 3, score: -30 },
            { bid: 1, actual: 1, score: 30 },
            { bid: 2, actual: 2, score: 40 },
            { bid: 3, actual: 0, score: -30 }
          ]
        },
        {
          round: 2,
          dealer:
            game!.rounds![0].dealer === 3 ? 0 : game!.rounds![0].dealer + 1
        }
      ]
    })
  })
})
