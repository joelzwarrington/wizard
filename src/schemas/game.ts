import { z } from 'zod'
import players from '@/schemas/players'

const schema = z.object({
  id: z.string().uuid(),
  players: players
})

export default schema

export type Game = z.infer<typeof schema>
