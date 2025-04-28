import { z } from 'zod'
import playerSchema from '@/schemas/player'

const schema = z.array(playerSchema).describe('List of players')

export default schema

export type Players = z.infer<typeof schema>
