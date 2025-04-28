import { z } from 'zod'

const schema = z.object({
  name: z.string().min(3).max(24).describe('The name of the player.')
})

export default schema

export type Player = z.infer<typeof schema>
