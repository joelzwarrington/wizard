import { redirect, useLoaderData, useMatches } from 'react-router'
import type { Info, Route } from './+types/game'
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

export async function clientLoader({ params }: Route.LoaderArgs) {
  const game = useGames.getState().currentGame()
  if (!game) return redirect('/404', 404)
  return game
}

export default function Page() {
  const data = useLoaderData<Info['loaderData']>()

  return <h1>{JSON.stringify(data)}</h1>
}
