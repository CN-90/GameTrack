import { removeMatchesFromLadder } from '@/helpers/ladderHelper';
import { getPlayer } from '@/helpers/playerHelper';
import { match } from 'assert';
import type { NextApiRequest, NextApiResponse } from 'next'



type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let data;
    switch (req.method) {
        case 'GET':
            break;

        case 'POST':


        case 'DELETE':
            let deletedPlayer = await deletePlayer(req, res);
            return res.status(200).json({ message: "Player has been successfully deleted.", deletedPlayer });

        default:

    }
}


async function deletePlayer(req: NextApiRequest, res: NextApiResponse) {
    const playerId = req.query.pid;

    let player = await getPlayer(playerId);


    // delete all matches the player is in.
    if (player.matches) {
        for (let match of player.matches) {
            await prisma.match.delete({
                where: {
                    id: match.id
                }
            })
        }
    }

    // delete player
    let deletedPlayer = await prisma.player.delete({
        where: {
            id: parseInt(playerId)
        }
    })

}

