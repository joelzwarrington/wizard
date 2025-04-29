import type { Game } from '@/schemas/game'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGameLength(game: Game) {
  switch (game.players.length) {
    case 3:
      return 20
    case 4:
      return 15
    case 5:
      return 12
    case 6:
      return 10
  }
}
