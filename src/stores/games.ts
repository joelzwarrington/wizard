import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Game } from '@/schemas/game'
import type { Players } from '@/schemas/players'
import { v4 as uuid } from 'uuid'
import type { Round } from '@/schemas/round'
import type { Trump } from '@/schemas/trump'

type AdvanceArgs =
  | {
      from: Extract<Round['step'], 'dealing'>
      trump: Trump
    }
  | { from: Extract<Round['step'], 'bidding'>; bids: number[] }
  | { from: Extract<Round['step'], 'scoring'>; tricks: number[] }

type GamesState = {
  games: {
    [key: string]: Game
  }
  currentGameId?: string
  currentGame: () => Game | undefined
  start: (players: Players) => string
  advance: (args: AdvanceArgs) => void
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
      },
      advance: (args) => {
        const game = get().currentGame()
        if (!game) return
        const round = game.rounds.at(-1)
        if (!round) return
        const rounds = [...game.rounds.slice(0, -1)]

        switch (args.from) {
          case 'dealing':
            if (round.step !== args.from) return

            return set({
              games: {
                ...get().games,
                [game.id]: {
                  ...game,
                  rounds: [
                    ...rounds,
                    {
                      ...round,
                      step: 'bidding',
                      trump: args.trump
                    }
                  ]
                }
              }
            })
          case 'bidding':
            if (round.step !== args.from) return

            return set({
              games: {
                ...get().games,
                [game.id]: {
                  ...game,
                  rounds: [
                    ...rounds,
                    {
                      ...round,
                      step: 'scoring',
                      bidding: args.bids.map((bid) => ({
                        bid
                      }))
                    }
                  ]
                }
              }
            })
          case 'scoring':
            if (round.step !== args.from) return

            return set({
              games: {
                ...get().games,
                [game.id]: {
                  ...game,
                  rounds: [
                    ...rounds,
                    {
                      ...round,
                      step: 'completed',
                      bidding: round.bidding.map(({ bid }, index) => {
                        const actual = args.tricks[index]
                        const score =
                          bid === actual
                            ? 20 + actual * 10
                            : -10 * Math.abs(actual - bid)
                        return {
                          bid,
                          actual,
                          score
                        }
                      })
                    },
                    {
                      step: 'dealing',
                      round: round.round + 1,
                      dealer: (round.dealer + 1) % game.players.length
                    }
                  ]
                }
              }
            })
        }
      }
    }),
    {
      name: 'game'
    }
  )
)
