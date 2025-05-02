import { Button } from '@/components/ui/button'
import type { Round } from '@/schemas/round'
import { useGames } from '@/stores/games'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import type { Player } from '@/schemas/player'
import {
  FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type DealingFormProps = {
  uuid: string
  players: Player[]
  round: Extract<Round, { step: 'bidding' }>
}

export const BiddingForm = ({ uuid, players, round }: DealingFormProps) => {
  const formSchema = z.object({
    bids: z.array(z.object({ amount: z.coerce.number().nonnegative() }))
  })

  const advance = useGames((set) => set.advance)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bids: players.map((_) => ({ amount: 0 }))
    }
  })

  const { fields } = useFieldArray({
    name: 'bids',
    control: form.control
  })

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(({ bids }) => {
          advance({
            uuid: uuid,
            from: round.step,
            bids: bids.map((b) => b.amount)
          })
        })}
        aria-label="Advance from bidding"
        className="px-2 py-4 flex flex-col gap-4"
      >
        <div className="flex gap-4">
          {fields.map((field, index) => {
            return (
              <FormField
                key={field.id}
                control={form.control}
                name={`bids.${index}.amount`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`${players[index].name}'s bid`}</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          })}
        </div>
        <Button size="lg" type="submit">
          Advance
        </Button>
      </form>
    </FormProvider>
  )
}
