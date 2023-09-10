import type { NextApiRequest } from 'next'
import prisma from '../../prisma/prisma';


export async function createMatch(req: NextApiRequest) {
    let match = await prisma.match.create({
        data: {
            ladder: {
                connect: { id: parseInt(req.body.ladderId)}
            },
            players: {
                connect: [
                    { id: req.body.playerOne },
                    { id: req.body.playerTwo }
                ]
            },
            winner: {
                connect: { id: req.body.winnerId },
            },
            loser: {
                connect: { id: req.body.loserId }
            }
        }
    });
    return match;
}


export async function deleteMatch(matchId: string) {
    const deletedMatch = await prisma.match.delete({
        where: {
            id: parseInt(matchId)
        }
    });
}

export async function deleteMatches(playerId: string, ladderId: string) {

   // find ladder
    let ladder = await prisma.ladder.findUnique({
         where: {
              id: parseInt(ladderId)
         }
    });
    console.log(ladder);
}


// model Match {
//   id       Int      @id @default(autoincrement())
//   players  Player[]
//   ladder   Ladder   @relation(fields: [ladderId], references: [id])
//   ladderId Int
//   draw     Boolean  @default(false)
//   winner   Player   @relation(name: "Wins", fields: [winnerId], references: [id])
//   winnerId Int
//   loser    Player   @relation(name: "Losses", fields: [loserId], references: [id])
//   loserId  Int
// }