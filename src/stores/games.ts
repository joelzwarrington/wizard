import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Game } from '@/schemas/game'
import type { Players } from '@/schemas/players'
import { v4 as uuid } from 'uuid'
import { isCompletedStep, type Round } from '@/schemas/round'
import type { Trump } from '@/schemas/trump'
import { getGameLength } from '@/lib/utils'

type AdvanceArgs =
  | {
      uuid: string
      from: Extract<Round['step'], 'dealing'>
      trump: Trump
    }
  | { uuid: string; from: Extract<Round['step'], 'bidding'>; bids: number[] }
  | { uuid: string; from: Extract<Round['step'], 'scoring'>; tricks: number[] }

type GamesState = {
  games: {
    [key: string]: Game
  }
  start: (players: Players) => string
  advance: (args: AdvanceArgs) => void
}

export const useGames = create<GamesState>()(
  persist(
    (set, get) => ({
      games: {},

      start: (players) => {
        const id = uuid()

        set({
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
        const game = get().games[args.uuid]
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

            const isLastRound = getGameLength(game) === round.round

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
                        const previousRound = rounds.at(-1)
                        const actual = args.tricks[index]
                        const previousScore =
                          (isCompletedStep(previousRound) &&
                            previousRound.bidding[index].score) ||
                          0

                        const score =
                          bid === actual
                            ? previousScore + 20 + actual * 10
                            : previousScore + -10 * Math.abs(actual - bid)

                        return {
                          bid,
                          actual,
                          score
                        }
                      })
                    },
                    ...((isLastRound
                      ? []
                      : [
                          {
                            step: 'dealing',
                            round: round.round + 1,
                            dealer: (round.dealer + 1) % game.players.length
                          }
                        ]) satisfies Round[])
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
