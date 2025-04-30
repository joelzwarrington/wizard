import type { Round } from '@/schemas/round'
import { useGames } from '@/stores/games'
import { Button } from '@/components/ui/button'

type RoundAdvancementFormProps = {
  uuid: string
  round: Round
}

export const RoundAdvancementForm = ({
  uuid,
  round
}: RoundAdvancementFormProps) => {
  const advance = useGames((set) => set.advance)

  switch (round.step) {
    case 'dealing':
      return (
        <Button
          onClick={() => {
            advance({ uuid, from: round.step, trump: 'Club' })
          }}
        >
          Advance from Dealing
        </Button>
      )
    case 'bidding':
      return (
        <Button
          onClick={() => {
            advance({ uuid, from: round.step, bids: [0, 0, 0, 1] })
          }}
        >
          Advance from Bidding
        </Button>
      )
    case 'scoring':
      return (
        <Button
          onClick={() => {
            advance({ uuid, from: round.step, tricks: [0, 0, 0, 1] })
          }}
        >
          Advance from Scoring
        </Button>
      )
    case 'completed':
      return 'completed'
  }
}
