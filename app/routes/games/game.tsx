import { redirect, useLoaderData, useMatches } from 'react-router'
import type { Info, Route } from './+types/game'
import { useGames } from '@/stores/games'
import { Badge } from '@/components/ui/badge'
import { ScoreSheet } from '@/components/ScoreSheet'
import { RoundAdvancementForm } from '@/components/RoundAdvancementForm'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Wizardly' },
    {
      name: 'description',
      content: 'A companion app for the Wizard card game.'
    }
  ]
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const game = useGames.getState().games[params.id]
  if (!game) return redirect('/404', 404)
  return game
}

export default function Page({
  params: { id }
}: Pick<Route.ComponentProps, 'params'>) {
  const game = useGames((set) => set.games)[id]
  if (!game) return
  const round = game.rounds.at(-1)
  if (!round) return

  return (
    <>
      <div className="px-4 sm:px-0">
        <h1 className="text-base/7 font-semibold text-white">Game</h1>
      </div>
      <ScoreSheet game={game} />
      <RoundAdvancementForm uuid={id} round={round} />
    </>
  )
}
