import { Link, NavLink, redirect, useLoaderData } from 'react-router'
import { ChevronRight } from 'lucide-react'
import type { Info, Route } from './+types/games'
import { zfd } from 'zod-form-data'
import PlayerSchema from '@/schemas/player'
import { useGames } from '@/stores/games'
import { useId } from 'react'
import { Badge } from '@/components/ui/badge'
import { GameTable } from '@/components/GameTable/GameTable'
import { Button } from '@/components/ui/button'

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
  return Object.entries(games)
    .sort(
      ([_uuidA, gameA], [_uuidB, gameB]) =>
        new Date(gameB.datetime).getTime() - new Date(gameA.datetime).getTime()
    )
    .map(([_uuid, game]) => game)
}

export default function Page() {
  const headingId = useId()
  const games = useLoaderData<Info['loaderData']>()

  return (
    <div className="sticky bottom-0 w-full mx-auto mt-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl py-8 flex flex-col gap-4">
        <div className="flex justify-between">
          <h1>Games</h1>
          <Button asChild>
            <NavLink to="/games/new">New game</NavLink>
          </Button>
        </div>
        <GameTable data={Array.from(games.values())} />
      </div>
    </div>
  )

  return (
    <div className="grid justify-items-center">
      <h1 id={headingId}>Games</h1>
      <ul
        role="list"
        aria-labelledby={headingId}
        className="divide-y divide-white/5"
      >
        {games.map((game) => (
          <li
            key={game.id}
            className="relative flex items-center space-x-4 py-4"
          >
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <h2 className="min-w-0 text-sm/6 font-semibold text-white">
                  <NavLink to={`/games/${game.id}`}>
                    {new Date(game.datetime).toLocaleString()}
                    <span className="absolute inset-0" />
                  </NavLink>
                </h2>
                {game.completed ? (
                  <Badge>Completed</Badge>
                ) : (
                  <Badge variant="secondary">In progress</Badge>
                )}
              </div>
              <div className="mt-1 flex items-center gap-x-2.5 text-xs/5 text-gray-400">
                <p className="truncate">{game.players.length} players</p>
              </div>
            </div>
            <ChevronRight
              aria-hidden="true"
              className="size-5 flex-none text-neutral-400"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
