import { useLoaderData, useMatches } from 'react-router'
import type { Info, Route } from './+types/game'

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
  return `Game ${params.id}`
}

export default function Page() {
  const data = useLoaderData<Info['loaderData']>()

  return <h1>{data}</h1>
}
