import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PlayerListForm } from '@/components/PlayerListForm/PlayerListForm'

describe('<PlayerListForm />', () => {
  it('has grid of players', () => {
    const screen = render(<PlayerListForm />)
    expect(screen.getByRole('grid', { name: 'Players' })).toBeInTheDocument()
  })

  it('adds new player to grid', async () => {
    const user = userEvent.setup()
    const screen = render(<PlayerListForm />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Joel')
    await user.click(screen.getByRole('button', { name: 'Add player' }))

    expect(screen.findByRole('listitem', { name: 'Joel' }))
  })

  it('clears new player form when submitted', async () => {
    const user = userEvent.setup()
    const screen = render(<PlayerListForm />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Joel')
    await user.click(screen.getByRole('button', { name: 'Add player' }))

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('')
  })
})
