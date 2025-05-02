import type { Round } from '@/schemas/round'
import { useGames } from '@/stores/games'
import { Button } from '@/components/ui/button'
import { DealingForm } from './steps/DealingForm'

type RoundAdvancementFormProps = {
  uuid: string
  round: Round
}

export const RoundAdvancementForm = ({
  uuid,
  round
}: RoundAdvancementFormProps) => {
  const advance = useGames((set) => set.advance)

  const component =
    round.step === 'dealing' ? (
      <DealingForm uuid={uuid} round={round} />
    ) : round.step === 'bidding' ? (
      <Button
        onClick={() => {
          advance({ uuid, from: round.step, bids: [0, 0, 0, 1] })
        }}
      >
        Advance from Bidding
      </Button>
    ) : round.step === 'scoring' ? (
      <Button
        onClick={() => {
          advance({ uuid, from: round.step, tricks: [0, 0, 0, 1] })
        }}
      >
        Advance from Scoring
      </Button>
    ) : round.step === 'completed' ? (
      'completed'
    ) : null

  return (
    <div className="sticky bottom-0 w-full mx-auto mt-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">{component}</div>
    </div>
  )
}
