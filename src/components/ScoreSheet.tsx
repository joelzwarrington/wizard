import type { Game } from '@/schemas/game'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { TrumpIcon } from './TrumpIcon'
import { getGameLength } from '@/lib/utils'

type ScoreSheetProps = {
  game: Game
}

export const ScoreSheet = ({ game }: ScoreSheetProps) => {
  const length = getGameLength(game)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="border-0">
            <span className="sr-only">Round Number</span>
          </TableHead>
          <TableHead className="border-0 flex items-end justify-center">
            <span className="not-sr-only">*</span>
            <span className="sr-only">Trump</span>
          </TableHead>
          {game.players.map((player) => (
            <TableHead colSpan={2} className="text-center">
              {player.name}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {game.rounds.map((round) => (
        <TableBody aria-label={`Round ${round.round}`}>
          <TableRow>
            <TableCell
              className="border-0 font-medium text-center"
              rowSpan={2}
              scope="rowgroup"
            >
              <span className="sr-only">Round</span> {round.round}
            </TableCell>
            <TableCell rowSpan={2} scope="rowgroup">
              <div className="flex items-center justify-center">
                {'trump' in round && <TrumpIcon trump={round.trump} />}
              </div>
            </TableCell>
            {'bidding' in round
              ? round.bidding.map((bidding, index) => (
                  <>
                    <TableCell rowSpan={2} className="text-center relative">
                      {bidding.score}
                      {index === round.dealer && (
                        <span className="absolute bottom-0.5 right-0.5 size-2.5 bg-[#fce800] border-2 border-white dark:border-gray-800 rounded-full"></span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">{bidding.bid}</TableCell>
                  </>
                ))
              : game.players.map(() => (
                  <>
                    <TableCell rowSpan={2} />
                    <TableCell />
                  </>
                ))}
          </TableRow>
          <TableRow>
            {'bidding' in round
              ? round.bidding.map((bidding) => (
                  <TableCell className="text-center">
                    {bidding.actual}
                  </TableCell>
                ))
              : game.players.map(() => <TableCell />)}
          </TableRow>
        </TableBody>
      ))}
      {Array.from(
        { length: (length || 0) - game.rounds.length },
        (_, index) => {
          const round = index + 1 + game.rounds.length

          return (
            <TableBody aria-label={`Round ${round}`}>
              <TableRow>
                <TableCell
                  className="border-0 font-medium text-center"
                  rowSpan={2}
                  scope="rowgroup"
                >
                  <span className="sr-only">Round</span> {round}
                </TableCell>
                <TableCell rowSpan={2} scope="rowgroup" />
                {game.players.map(() => (
                  <>
                    <TableCell rowSpan={2} />
                    <TableCell />
                  </>
                ))}
              </TableRow>
              <TableRow>
                {game.players.map(() => (
                  <TableCell />
                ))}
              </TableRow>
            </TableBody>
          )
        }
      )}
    </Table>
  )
}
