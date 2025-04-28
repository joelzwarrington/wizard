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
import { useDragAndDrop } from 'react-aria-components'
import { useListData } from 'react-stately'

export const PlayerListForm = () => {
  const list = useListData<Player>({ getKey: (item) => item.name })

  const form = useForm<Player>({
    resolver: zodResolver(PlayerSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = (player: Player) => {
    list.append(player)
    form.reset()
  }

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        'text/plain': list.getItem(key)!.name
      })),
    onReorder(e) {
      if (e.target.dropPosition === 'before') {
        list.moveBefore(e.target.key, e.keys)
      } else if (e.target.dropPosition === 'after') {
        list.moveAfter(e.target.key, e.keys)
      }
    }
  })

  return (
    <>
      <GridList
        aria-label="Players"
        items={list.items}
        dragAndDropHooks={dragAndDropHooks}
      >
        {(player) => (
          <GridListItem id={player.name}>
            <Button variant="ghost" size="icon" slot="drag">
              ≡
            </Button>
            {player.name}
          </GridListItem>
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
