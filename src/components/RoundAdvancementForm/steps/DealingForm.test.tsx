import { render } from '@testing-library/react'
import { DealingForm } from './DealingForm'
import type { Round } from '@/schemas/round'
import { useGames } from '@/stores/games'
import userEvent from '@testing-library/user-event'

describe('<DealingForm />', () => {
  const uuid = '55a5d47d-6942-4e93-8e19-4ca8c7477ab6'
  const round: Round = { round: 1, step: 'dealing', dealer: 0 }

  it('renders form to advance', () => {
    const screen = render(<DealingForm uuid={uuid} round={round} />)

    expect(
      screen.getByRole('form', { name: 'Advance from dealing' })
    ).toBeInTheDocument()
  })

  it('advances with selected trump', async () => {
    const advanceFn = vi.fn()
    useGames.setState({ advance: advanceFn })
    const screen = render(<DealingForm uuid={uuid} round={round} />)

    await userEvent.click(screen.getByRole('radio', { name: 'Heart' }))
    await userEvent.click(screen.getByRole('button', { name: 'Advance' }))

    expect(advanceFn).toHaveBeenCalledOnce()
    expect(advanceFn).toHaveBeenCalledWith({
      uuid: uuid,
      from: 'dealing',
      trump: 'Heart'
    })

    advanceFn.mockReset()

    await userEvent.click(screen.getByRole('radio', { name: 'None' }))
    await userEvent.click(screen.getByRole('button', { name: 'Advance' }))

    expect(advanceFn).toHaveBeenCalledOnce()
    expect(advanceFn).toHaveBeenCalledWith({
      uuid: uuid,
      from: 'dealing',
      trump: 'None'
    })
  })
})
