import { vi } from 'vitest'
import { render } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import userEvent from '@testing-library/user-event'

import Page from '@/app/routes/games/new'

describe('/games/new', () => {
  const action = vi.fn()
  const PageWithRouter = createRoutesStub([
    {
      path: '/games/new',
      Component: Page
    },
    {
      path: '/games',
      action: async ({ request }) => {
        action(Object.fromEntries((await request.formData()).entries()))
      }
    }
  ])

  it('has heading', () => {
    const screen = render(<PageWithRouter initialEntries={['/games/new']} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'New game'
    )
  })

  it('defaults to one player', () => {
    const screen = render(<PageWithRouter initialEntries={['/games/new']} />)
    expect(screen.getAllByLabelText('Name')).toHaveLength(1)
  })

  it('adds new player name input', async () => {
    const user = userEvent.setup()
    const screen = render(<PageWithRouter initialEntries={['/games/new']} />)

    expect(screen.getAllByRole('textbox', { name: 'Name' })).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: 'Add player' }))
    expect(screen.getAllByRole('textbox', { name: 'Name' })).toHaveLength(2)
  })

  it('submits action', async () => {
    const user = userEvent.setup()
    const screen = render(<PageWithRouter initialEntries={['/games/new']} />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Joel')
    await user.click(screen.getByRole('button', { name: 'Start game' }))

    expect(action).toHaveBeenLastCalledWith({ 'players.0.name': 'Joel' })
  })

  it('submits action with multiple player names', async () => {
    const user = userEvent.setup()
    const screen = render(<PageWithRouter initialEntries={['/games/new']} />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Joel')
    await user.click(screen.getByRole('button', { name: 'Add player' }))
    await user.type(
      screen.getAllByRole('textbox', { name: 'Name' })[1],
      'Calisto'
    )

    await user.click(screen.getByRole('button', { name: 'Start game' }))

    expect(action).toHaveBeenLastCalledWith({
      'players.0.name': 'Joel',
      'players.1.name': 'Calisto'
    })
  })
})
