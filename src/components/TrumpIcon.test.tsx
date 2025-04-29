import { render } from '@testing-library/react'
import { TrumpIcon } from './TrumpIcon'
import type { Trump } from '@/schemas/trump'

describe('<TrumpIcon />', () => {
  const cases: [NonNullable<Trump>, string][] = [
    ['Diamond', 'Diamond'],
    ['Club', 'Club'],
    ['Spade', 'Spade'],
    ['Heart', 'Heart']
  ]

  it.each(cases)('renders img with label (%s)', (trump, name) => {
    const screen = render(<TrumpIcon trump={trump} />)

    expect(screen.getByRole('img', { name: name })).toBeInTheDocument()
  })

  it("doesn't render an img when null", () => {
    const screen = render(<TrumpIcon trump={null} />)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
