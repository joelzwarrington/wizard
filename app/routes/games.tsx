import { Link, NavLink, redirect, useLoaderData } from 'react-router'
import type { Info, Route } from './+types/games'
import { zfd } from 'zod-form-data'
import PlayerSchema from '@/schemas/player'
import { useGames } from '@/stores/games'
import { Button } from '@/components/ui/button'
import { useId } from 'react'

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

export async function clientLoader() {
  const games = useGames.getState().games
  return games
}

export default function Page() {
  const headingId = useId()
  const games = useLoaderData<Info['loaderData']>()

  return (
    <div className="grid justify-items-center">
      <h1 id={headingId}>Games</h1>
      <ul aria-labelledby={headingId}>
        {Object.entries(games).map(([uuid, game]) => {
          return (
            <li>
              <Button asChild>
                <NavLink to={`/games/${uuid}`}>{game.id}</NavLink>
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
