import Logo from '~/components/Logo/Logo'
import type { Route } from './+types/new'
import { NavLink } from 'react-router'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Wizardly' },
    {
      name: 'description',
      content: 'A companion app for the Wizard card game.'
    }
  ]
}

export default function Page() {
  return (
    <div className="grid justify-items-center">
      <h1>New game</h1>
    </div>
  )
}
