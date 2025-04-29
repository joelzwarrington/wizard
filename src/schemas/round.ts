import { z } from 'zod'
import TrumpSchema from '@/schemas/trump'

const schema = z.discriminatedUnion('step', [
  z.object({
    step: z.literal('dealing'),
    round: z.number(),
    dealer: z.number()
  }),
  z.object({
    step: z.literal('bidding'),
    round: z.number(),
    dealer: z.number(),
    trump: TrumpSchema,
    bidding: z
      .object({
        bid: z.number().nullable(),
        actual: z.number().nullable(),
        score: z.number().nullable()
      })
      .array()
  }),
  z.object({
    step: z.literal('scoring'),
    round: z.number(),
    dealer: z.number(),
    trump: z
      .union([
        z.literal('Club'),
        z.literal('Diamond'),
        z.literal('Heart'),
        z.literal('Spade')
      ])
      .nullable(),
    bidding: z
      .object({
        bid: z.number(),
        actual: z.number().nullable(),
        score: z.number().nullable()
      })
      .array()
  }),
  z.object({
    step: z.literal('completed'),
    round: z.number(),
    dealer: z.number(),
    trump: z
      .union([
        z.literal('Club'),
        z.literal('Diamond'),
        z.literal('Heart'),
        z.literal('Spade')
      ])
      .nullable(),
    bidding: z
      .object({
        bid: z.number(),
        actual: z.number(),
        score: z.number()
      })
      .array()
  })
])

export default schema

export type Round = z.infer<typeof schema>
