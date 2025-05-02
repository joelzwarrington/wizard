import { z } from 'zod'
import TrumpSchema from '@/schemas/trump'

const dealing = z.object({
  step: z.literal('dealing'),
  round: z.number(),
  dealer: z.number()
})

const bidding = z.object({
  step: z.literal('bidding'),
  round: z.number(),
  dealer: z.number(),
  trump: TrumpSchema
})

const scoring = z.object({
  step: z.literal('scoring'),
  round: z.number(),
  dealer: z.number(),
  trump: TrumpSchema,
  bidding: z
    .object({
      bid: z.number()
    })
    .array()
})

const completed = z.object({
  step: z.literal('completed'),
  round: z.number(),
  dealer: z.number(),
  trump: TrumpSchema,
  bidding: z
    .object({
      bid: z.number(),
      actual: z.number(),
      score: z.number()
    })
    .array()
})

const schema = z.discriminatedUnion('step', [
  dealing,
  bidding,
  scoring,
  completed
])

export default schema

export type Round = z.infer<typeof schema>

export const isDealingStep = (
  round: Round
): round is z.infer<typeof dealing> => {
  return round.step === 'dealing'
}

export const isBiddingStep = (
  round: Round
): round is z.infer<typeof bidding> => {
  return round.step === 'bidding'
}

export const isScoringStep = (
  round: Round
): round is z.infer<typeof scoring> => {
  return round.step === 'scoring'
}

export const isCompletedStep = (
  round?: Round
): round is z.infer<typeof completed> => {
  return round?.step === 'completed'
}
