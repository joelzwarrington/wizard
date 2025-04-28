import { Button } from '@/components/ui/button'
import type { Route } from './+types/new'
import PlayersSchema from '@/schemas/players'
import { Form } from 'react-router'
import {
  FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Wizardly' },
    {
      name: 'description',
      content: 'A companion app for the Wizard card game.'
    }
  ]
}

export const formSchema = z.object({
  players: PlayersSchema
})

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      players: [{ name: '' }]
    }
  })

  const { fields, append } = useFieldArray({
    name: 'players',
    control: form.control
  })

  return (
    <div className="grid justify-items-center">
      <h1>New game</h1>
      <FormProvider {...form}>
        <Form
          action="/games"
          method="post"
          aria-label="Add player"
          className="space-y-8"
        >
          <div>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`players.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ name: '' })}
            >
              Add player
            </Button>
          </div>
          <Button type="submit" variant="default" size="sm" className="mt-2">
            Start game
          </Button>
        </Form>
      </FormProvider>
    </div>
  )
}
