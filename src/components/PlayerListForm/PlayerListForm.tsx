import PlayerSchema from '@/schemas/player'
import type { Player } from '@/schemas/player'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GridList, GridListItem } from 'react-aria-components'
import type { Players } from '@/schemas/players'
import { useState } from 'react'

export const PlayerListForm = () => {
  const [players, setPlayers] = useState<Players>([])

  const form = useForm<Player>({
    resolver: zodResolver(PlayerSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = (player: Player) =>
    setPlayers((prev) => {
      form.reset()
      return [...prev, player]
    })

  return (
    <>
      <GridList aria-label="Players" items={players}>
        {(player) => (
          <GridListItem id={player.name}>{player.name}</GridListItem>
        )}
      </GridList>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          aria-label="Add player"
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add player</Button>
        </form>
      </Form>
    </>
  )
}
