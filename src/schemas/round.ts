import { z } from 'zod'

const schema = z.object({
  round: z.number(),
  dealer: z.number(),
  trump: z
    .union([
      z.literal('Club'),
      z.literal('Diamond'),
      z.literal('Heart'),
      z.literal('Spade')
    ])
    .nullable()
    .optional(),
  bidding: z
    .object({
      bid: z.number().nullable(),
      actual: z.number().nullable(),
      score: z.number().nullable()
    })
    .array()
})

export default schema

export type Round = z.infer<typeof schema>
