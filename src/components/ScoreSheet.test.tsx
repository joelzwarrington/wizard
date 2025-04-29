import { render, within } from '@testing-library/react'
import { ScoreSheet } from '@/components/ScoreSheet'
import type { Game } from '@/schemas/game'

describe('<ScoreSheet />', () => {
  const game: Game = {
    id: '439b3189-eaea-4c88-aece-2bbf6a0bba09',
    datetime: '2025-04-29T05:11:56.292Z',
    completed: false,
    players: [
      { name: 'Howl' },
      { name: 'Calisto' },
      { name: 'Prince' },
      { name: 'Rory' }
    ],
    rounds: [
      {
        round: 1,
        trump: 'Heart',
        step: 'completed',
        dealer: 0,
        bidding: [
          { bid: 0, actual: 0, score: 20 },
          { bid: 0, actual: 0, score: 20 },
          { bid: 1, actual: 0, score: -10 },
          { bid: 1, actual: 1, score: 30 }
        ]
      },
      {
        round: 2,
        trump: 'Diamond',
        step: 'completed',
        dealer: 1,
        bidding: [
          { bid: 0, actual: 0, score: 40 },
          { bid: 2, actual: 2, score: 60 },
          { bid: 1, actual: 0, score: -20 },
          { bid: 0, actual: 0, score: 50 }
        ]
      },
      {
        round: 3,
        trump: 'Club',
        step: 'completed',
        dealer: 2,
        bidding: [
          { bid: 0, actual: 0, score: 40 },
          { bid: 2, actual: 2, score: 60 },
          { bid: 1, actual: 1, score: -20 },
          { bid: 0, actual: 0, score: 50 }
        ]
      },
      {
        round: 4,
        trump: 'Spade',
        step: 'completed',
        dealer: 3,
        bidding: [
          { bid: 0, actual: 0, score: 40 },
          { bid: 2, actual: 2, score: 60 },
          { bid: 1, actual: 1, score: -20 },
          { bid: 0, actual: 0, score: 50 }
        ]
      },
      {
        round: 5,
        trump: 'Spade',
        step: 'completed',
        dealer: 0,
        bidding: [
          { bid: 0, actual: 0, score: 40 },
          { bid: 2, actual: 2, score: 60 },
          { bid: 1, actual: 1, score: -20 },
          { bid: 0, actual: 0, score: 50 }
        ]
      },
      {
        round: 6,
        step: 'dealing',
        dealer: 1
      }
    ]
  }

  it('renders each round', () => {
    const screen = render(<ScoreSheet game={game} />)

    expect(screen.getAllByRole('rowgroup', { name: /Round \d+/ })).toHaveLength(
      15
    )
  })
})
