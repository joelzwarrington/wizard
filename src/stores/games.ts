import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Game } from '@/schemas/game'
import type { Players } from '@/schemas/players'
import { v4 as uuid } from 'uuid'

type GamesState = {
  games: {
    [key: string]: Game
  }
  currentGameId?: string
  currentGame: () => Game | undefined
  start: (players: Players) => string
}

export const useGames = create<GamesState>()(
  persist(
    (set, get) => ({
      games: {},
      currentGame: () => {
        const currentGameId = get().currentGameId
        if (!currentGameId) return

        return get().games[currentGameId]
      },
      start: (players) => {
        const id = uuid()

        set({
          currentGameId: id,
          games: {
            ...get().games,
            [id]: {
              id,
              datetime: new Date().toISOString(),
              completed: false,
              players,
              rounds: [
                {
                  round: 1,
                  step: 'dealing',
                  dealer: Math.floor(Math.random() * players.length)
                }
              ]
            }
          }
        })

        return id
      }
    }),
    {
      name: 'game'
    }
  )
)
