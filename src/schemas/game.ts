import { z } from 'zod'
import players from '@/schemas/players'

const schema = z.object({
  players: players
})

export default schema

export type Game = z.infer<typeof schema>
