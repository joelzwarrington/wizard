import { render } from '@testing-library/react'
import { RoundAdvancementForm } from './RoundAdvancementForm'
import type { Round } from '@/schemas/round'
import type { Player } from '@/schemas/player'

describe('<RoundAdvancementForm />', () => {
  const [dealing, bidding, scoring, completed]: Round[] = [
    { round: 1, step: 'dealing', dealer: 0 },
    {
      round: 2,
      step: 'bidding',
      dealer: 1,
      trump: 'Diamond'
    },
    {
      round: 3,
      step: 'scoring',
      dealer: 2,
      trump: 'Heart',
      bidding: [{ bid: 1 }, { bid: 2 }, { bid: 3 }]
    },
    {
      round: 20,
      step: 'completed',
      dealer: 0,
      trump: 'Club',
      bidding: [
        { bid: 5, actual: 5, score: 300 },
        { bid: 5, actual: 5, score: 500 },
        { bid: 5, actual: 5, score: 500 }
      ]
    }
  ]
  const players: Player[] = [
    { name: 'Prince' },
    { name: 'Calisto' },
    { name: 'Howl' }
  ]

  const uuid = '55a5d47d-6942-4e93-8e19-4ca8c7477ab6'

  describe('when dealing', () => {
    it('renders form to advance', () => {
      const screen = render(
        <RoundAdvancementForm uuid={uuid} players={players} round={dealing} />
      )

      expect(
        screen.getByRole('form', { name: 'Advance from dealing' })
      ).toBeInTheDocument()
    })
  })

  describe('when bidding', () => {
    it('renders form to advance', () => {
      const screen = render(
        <RoundAdvancementForm uuid={uuid} players={players} round={bidding} />
      )

      expect(
        screen.getByRole('form', { name: 'Advance from bidding' })
      ).toBeInTheDocument()
    })
  })

  describe('when scoring', () => {
    it('renders form to advance', () => {
      const screen = render(
        <RoundAdvancementForm uuid={uuid} players={players} round={scoring} />
      )

      expect(
        screen.getByRole('form', { name: 'Advance from scoring' })
      ).toBeInTheDocument()
    })
  })
})
