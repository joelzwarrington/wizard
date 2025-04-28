import type { Route } from './+types/home'
import { NavLink } from 'react-router'
import Logo from '@/app/logo.svg'
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

export default function Page() {
  return (
    <div className="grid justify-items-center">
      <h1 className="sr-only">Wizardly</h1>
      <p className="sr-only">A companion app for the Wizard card game.</p>
      <img src={Logo} alt="Logo of the Wizard card game" />
      <Button asChild>
        <NavLink to="/games/new">New game</NavLink>
      </Button>
    </div>
  )
}
