import { render } from '@testing-library/react'
import { BiddingForm } from './BiddingForm'
import type { Round } from '@/schemas/round'
import { useGames } from '@/stores/games'
import userEvent from '@testing-library/user-event'
import type { Player } from '@/schemas/player'

describe('<BiddingForm />', () => {
  const uuid = '55a5d47d-6942-4e93-8e19-4ca8c7477ab6'
  const round: Round = { round: 1, step: 'bidding', dealer: 0, trump: 'Club' }
  const players: Player[] = [
    { name: 'Howl' },
    { name: 'Prince' },
    { name: 'Calisto' }
  ]

  it('renders form to advance', () => {
    const screen = render(
      <BiddingForm uuid={uuid} players={players} round={round} />
    )

    expect(
      screen.getByRole('form', { name: 'Advance from bidding' })
    ).toBeInTheDocument()
  })

  it('advances with provided bids', async () => {
    const advanceFn = vi.fn()
    useGames.setState({ advance: advanceFn })
    const screen = render(
      <BiddingForm uuid={uuid} players={players} round={round} />
    )

    await userEvent.type(
      screen.getByRole('spinbutton', { name: "Howl's bid" }),
      '1'
    )
    await userEvent.type(
      screen.getByRole('spinbutton', { name: "Prince's bid" }),
      '2'
    )
    await userEvent.type(
      screen.getByRole('spinbutton', { name: "Calisto's bid" }),
      '5'
    )

    await userEvent.click(screen.getByRole('button', { name: 'Advance' }))

    expect(advanceFn).toHaveBeenCalledOnce()
    expect(advanceFn).toHaveBeenCalledWith({
      uuid: uuid,
      from: 'bidding',
      bids: [1, 2, 5]
    })
  })
})
