import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Game } from '~/schemas/game'

export const useGame = create<Game>()(
  devtools(
    persist(
      (set) => ({
        players: []
      }),
      {
        name: 'game'
      }
    )
  )
)
