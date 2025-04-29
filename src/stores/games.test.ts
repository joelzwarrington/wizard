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
})
