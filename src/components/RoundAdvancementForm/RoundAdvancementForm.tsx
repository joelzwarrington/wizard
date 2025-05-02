import type { Round } from '@/schemas/round'
import { DealingForm } from './steps/DealingForm'
import { BiddingForm } from './steps/BiddingForm'
import type { Player } from '@/schemas/player'
import { ScoringForm } from './steps/ScoringForm'

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
  const component =
    round.step === 'dealing' ? (
      <DealingForm uuid={uuid} round={round} />
    ) : round.step === 'bidding' ? (
      <BiddingForm uuid={uuid} players={players} round={round} />
    ) : round.step === 'scoring' ? (
      <ScoringForm uuid={uuid} players={players} round={round} />
    ) : null

  return (
    <div className="sticky bottom-0 w-full mx-auto mt-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">{component}</div>
    </div>
  )
}
