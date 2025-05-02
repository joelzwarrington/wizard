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

type ScoringFormProps = {
  uuid: string
  players: Player[]
  round: Extract<Round, { step: 'scoring' }>
}

export const ScoringForm = ({ uuid, players, round }: ScoringFormProps) => {
  const formSchema = z.object({
    tricks: z.array(z.object({ amount: z.coerce.number().nonnegative() }))
  })

  const advance = useGames((set) => set.advance)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tricks: round.bidding.map(({ bid }) => ({ amount: bid }))
    }
  })

  const { fields } = useFieldArray({
    name: 'tricks',
    control: form.control
  })

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(({ tricks }) => {
          advance({
            uuid: uuid,
            from: round.step,
            tricks: tricks.map((b) => b.amount)
          })
        })}
        aria-label="Advance from scoring"
        className="px-2 py-4 flex flex-col gap-4"
      >
        <div className="flex gap-4">
          {fields.map((field, index) => {
            return (
              <FormField
                key={field.id}
                control={form.control}
                name={`tricks.${index}.amount`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>{`${players[index].name}'s tricks`}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={round.round}
                        {...field}
                      />
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
