import Logo from '@/components/Logo/Logo'
import type { Route } from './+types/home'
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
      <h1 className="sr-only">Wizardly</h1>
      <p className="sr-only">A companion app for the Wizard card game.</p>
      <Logo />
      <NavLink to="/games/new">New game</NavLink>
    </div>
  )
}
