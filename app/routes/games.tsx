import { redirect } from 'react-router'
import type { Route } from './+types/games'
import { zfd } from 'zod-form-data'
import PlayerSchema from '@/schemas/player'
import { useGames } from '@/stores/games'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Wizardly' },
    {
      name: 'description',
      content: 'A companion app for the Wizard card game.'
    }
  ]
}

const schema = zfd.formData({
  players: zfd.repeatableOfType(PlayerSchema)
})

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { players } = schema.parse(await request.formData())
  const id = useGames.getState().start(players)
  return redirect(`/games/${id}`)
}

export default function Page() {
  return (
    <div className="grid justify-items-center">
      <h1>Games</h1>
    </div>
  )
}
