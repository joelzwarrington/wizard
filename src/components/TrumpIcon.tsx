import { cn } from '@/lib/utils'
import type { Trump } from '@/schemas/trump'
import { Club, Diamond, Heart, Spade } from 'lucide-react'

type TrumpIconProps = {
  trump: Trump
  className?: string
}

export const TrumpIcon = ({ trump, className }: TrumpIconProps) => {
  switch (trump) {
    case 'Heart':
      return (
        <Heart
          role="img"
          aria-hidden="false"
          aria-label="Heart"
          className={cn('size-5 text-red-suit fill-red-suit', className)}
        />
      )
    case 'Diamond':
      return (
        <Diamond
          role="img"
          aria-hidden="false"
          aria-label="Diamond"
          className={cn('size-5 text-red-suit fill-red-suit', className)}
        />
      )
    case 'Club':
      return (
        <Club
          role="img"
          aria-hidden="false"
          aria-label="Club"
          className={cn('size-5 text-black-suit fill-black-suit', className)}
        />
      )
    case 'Spade':
      return (
        <Spade
          role="img"
          aria-hidden="false"
          aria-label="Spade"
          className={cn('size-5 text-black-suit fill-black-suit', className)}
        />
      )
  }
}
