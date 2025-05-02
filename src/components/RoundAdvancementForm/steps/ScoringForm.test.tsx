import { render } from '@testing-library/react'
import { ScoringForm } from './ScoringForm'
import type { Round } from '@/schemas/round'
import { useGames } from '@/stores/games'
import userEvent from '@testing-library/user-event'
import type { Player } from '@/schemas/player'

describe('<ScoringForm />', () => {
  const uuid = '55a5d47d-6942-4e93-8e19-4ca8c7477ab6'
  const round: Round = {
    round: 1,
    step: 'scoring',
    dealer: 0,
    trump: 'Club',
    bidding: [{ bid: 0 }, { bid: 1 }, { bid: 1 }]
  }
  const players: Player[] = [
    { name: 'Howl' },
    { name: 'Prince' },
    { name: 'Calisto' }
  ]

  it('renders form to advance', () => {
    const screen = render(
      <ScoringForm uuid={uuid} players={players} round={round} />
    )

    expect(
      screen.getByRole('form', { name: 'Advance from scoring' })
    ).toBeInTheDocument()
  })

  it('advances with provided tricks', async () => {
    const advanceFn = vi.fn()
    useGames.setState({ advance: advanceFn })
    const screen = render(
      <ScoringForm uuid={uuid} players={players} round={round} />
    )

    await userEvent.clear(
      screen.getByRole('spinbutton', { name: "Howl's tricks" })
    )
    await userEvent.type(
      screen.getByRole('spinbutton', { name: "Howl's tricks" }),
      '0'
    )
    await userEvent.clear(
      screen.getByRole('spinbutton', { name: "Prince's tricks" })
    )
    await userEvent.type(
      screen.getByRole('spinbutton', { name: "Prince's tricks" }),
      '1'
    )
    await userEvent.clear(
      screen.getByRole('spinbutton', { name: "Calisto's tricks" })
    )
    await userEvent.type(
      screen.getByRole('spinbutton', { name: "Calisto's tricks" }),
      '0'
    )

    await userEvent.click(screen.getByRole('button', { name: 'Advance' }))

    expect(advanceFn).toHaveBeenCalledOnce()
    expect(advanceFn).toHaveBeenCalledWith({
      uuid: uuid,
      from: 'scoring',
      tricks: [0, 1, 0]
    })
  })

  it('defaults tricks with their bids', () => {
    const screen = render(
      <ScoringForm uuid={uuid} players={players} round={round} />
    )

    expect(
      screen.getByRole('spinbutton', { name: "Howl's tricks" })
    ).toHaveValue(0)

    expect(
      screen.getByRole('spinbutton', { name: "Prince's tricks" })
    ).toHaveValue(1)

    expect(
      screen.getByRole('spinbutton', { name: "Calisto's tricks" })
    ).toHaveValue(1)
  })
})
