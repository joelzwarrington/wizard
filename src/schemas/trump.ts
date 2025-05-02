import { z } from 'zod'

const schema = z.union([
  z.literal('Club'),
  z.literal('Diamond'),
  z.literal('Heart'),
  z.literal('Spade'),
  z.literal('None')
])

export default schema

export type Trump = z.infer<typeof schema>
