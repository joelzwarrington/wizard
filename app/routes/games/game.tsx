import { redirect, useLoaderData, useMatches } from 'react-router'
import type { Info, Route } from './+types/game'
import { useGames } from '@/stores/games'
import { Badge } from '@/components/ui/badge'
import { ScoreSheet } from '@/components/ScoreSheet'

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
  const game = useGames.getState().currentGame()
  if (!game) return redirect('/404', 404)
  return game
}

export default function Page() {
  const game = useGames((set) => set.currentGame)()

  if (!game) return <>No game found.</>

  return (
    <>
      <div className="px-4 sm:px-0">
        <h1 className="text-base/7 font-semibold text-white">Game</h1>
      </div>
      <ScoreSheet game={game} />
      <pre>{JSON.stringify(game, null, 2)}</pre>
      <ul>
        {game.rounds.map((round) => (
          <div className="overflow-hidden bg-slate-900 sm:rounded-lg">
            <div className="px-4 py-6 sm:px-6">
              <h3 className="text-base/7 font-semibold text-white">
                Round {round.round}
              </h3>
              <Badge>{round.step}</Badge>
            </div>
            Dealer: {game.players[round.dealer].name}
            <pre>{JSON.stringify(round, null, 2)}</pre>
            <p>When step === 'dealing' show form to select suit</p>
            <p>When step === 'bidding' ask for bids of each player</p>
            <p>When step === 'scoring' ask for actual of each player</p>
            <p>When step === 'completed' just show scores</p>
          </div>
        ))}
      </ul>
    </>
  )
}
