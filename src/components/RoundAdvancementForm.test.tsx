import { render } from '@testing-library/react'
import { RoundAdvancementForm } from './RoundAdvancementForm'
import type { Round } from '@/schemas/round'

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

  const uuid = '55a5d47d-6942-4e93-8e19-4ca8c7477ab6'

  describe('when dealing', () => {
    it('renders button to advance', () => {
      const screen = render(
        <RoundAdvancementForm uuid={uuid} round={dealing} />
      )

      expect(
        screen.getByRole('button', { name: 'Advance from Dealing' })
      ).toBeInTheDocument()
    })
  })

  describe('when bidding', () => {
    it('renders button to advance', () => {
      const screen = render(
        <RoundAdvancementForm uuid={uuid} round={bidding} />
      )

      expect(
        screen.getByRole('button', { name: 'Advance from Bidding' })
      ).toBeInTheDocument()
    })
  })

  describe('when scoring', () => {
    it('renders button to advance', () => {
      const screen = render(
        <RoundAdvancementForm uuid={uuid} round={scoring} />
      )

      expect(
        screen.getByRole('button', { name: 'Advance from Scoring' })
      ).toBeInTheDocument()
    })
  })

  describe('when completed', () => {
    it('renders nothing', () => {
      const screen = render(
        <RoundAdvancementForm uuid={uuid} round={completed} />
      )

      expect(screen.getByText('completed')).toBeInTheDocument()
    })
  })
})
