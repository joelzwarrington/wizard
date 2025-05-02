import { TrumpIcon } from '@/components/TrumpIcon'
import { Button } from '@/components/ui/button'
import type { Round } from '@/schemas/round'
import { useGames } from '@/stores/games'
import { zodResolver } from '@hookform/resolvers/zod'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import TrumpSchema, { type Trump } from '@/schemas/trump'

type DealingFormProps = {
  uuid: string
  round: Extract<Round, { step: 'dealing' }>
}

export const formSchema = z.object({
  trump: TrumpSchema
})

const trumps = ['Club', 'Diamond', 'Spade', 'Heart', 'None'] satisfies Trump[]

export const DealingForm = ({ uuid, round }: DealingFormProps) => {
  const advance = useGames((set) => set.advance)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {}
  })

  return (
    <form
      onSubmit={form.handleSubmit(({ trump }) => {
        advance({ uuid: uuid, from: round.step, trump })
      })}
      aria-label="Advance from dealing"
      className="px-2 py-4 flex flex-col gap-4"
    >
      <Controller
        control={form.control}
        name="trump"
        render={({ field: { onChange, value, ...field } }) => (
          <ToggleGroup.Root
            className="grid grid-cols-5 grid-rows-1 gap-4"
            type="single"
            orientation="horizontal"
            aria-label="Round Trump"
            value={value || ''}
            {...field}
            onValueChange={onChange}
          >
            {trumps.map((trump) => (
              <ToggleGroup.Item
                key={trump}
                name="trump"
                value={trump}
                aria-label={trump}
                className="overflow-hidden rounded-lg bg-(--card) shadow-sm aspect-2/3 flex items-center justify-center border-1 data-[state=on]:shadow-lg data-[state=on]:border-primary data-[state=on]:shadow-primary z-10"
              >
                <TrumpIcon trump={trump} />
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        )}
      />
      <Button size="lg" type="submit">
        Advance
      </Button>
    </form>
  )
}
