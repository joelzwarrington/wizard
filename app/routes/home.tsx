import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Wizard' },
    {
      name: 'description',
      content: 'A companion app for the Wizard card game.'
    }
  ]
}

export default function Home() {
  return <>Hello World!</>
}
