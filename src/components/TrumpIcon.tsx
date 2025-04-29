import type { Trump } from '@/schemas/trump'
import { Club, Diamond, Heart, Spade } from 'lucide-react'

type TrumpIconProps = {
  trump: Trump
}

export const TrumpIcon = ({ trump }: TrumpIconProps) => {
  switch (trump) {
    case 'Heart':
      return (
        <Heart
          role="img"
          aria-hidden="false"
          aria-label="Heart"
          size={12}
          color="#ff0000"
          fill="#ff0000"
        />
      )
    case 'Diamond':
      return (
        <Diamond
          role="img"
          aria-hidden="false"
          aria-label="Diamond"
          size={12}
          color="#ff0000"
          fill="#ff0000"
        />
      )
    case 'Club':
      return (
        <Club
          role="img"
          aria-hidden="false"
          aria-label="Club"
          size={12}
          color="#000"
          fill="#000"
        />
      )
    case 'Spade':
      return (
        <Spade
          role="img"
          aria-hidden="false"
          aria-label="Spade"
          size={12}
          color="#000"
          fill="#000"
        />
      )
    default:
      return <></>
  }
}
