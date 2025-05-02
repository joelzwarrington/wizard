import type { Round } from '@/schemas/round'
import { useGames } from '@/stores/games'
import { Button } from '@/components/ui/button'
import { DealingForm } from './steps/DealingForm'
import { BiddingForm } from './steps/BiddingForm'
import type { Player } from '@/schemas/player'

type RoundAdvancementFormProps = {
  uuid: string
  players: Player[]
  round: Round
}

export const RoundAdvancementForm = ({
  uuid,
  players,
  round
}: RoundAdvancementFormProps) => {
  const advance = useGames((set) => set.advance)

  const component =
    round.step === 'dealing' ? (
      <DealingForm uuid={uuid} round={round} />
    ) : round.step === 'bidding' ? (
      <BiddingForm uuid={uuid} players={players} round={round} />
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
