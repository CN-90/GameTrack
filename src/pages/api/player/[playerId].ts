import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma';
import { removeMatchesFromLadder } from '@/helpers/ladderHelper';


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
            return res.status(200).json({message: "Player has been successfully deleted.", deletedPlayer});

        default:

    }
}


async function deletePlayer(req: NextApiRequest, res: NextApiResponse) {
    console.log("You've hit the delete player route, congratulations...");
    console.log(req.query.playerId);
    // const playerId = parseInt(req.query.playerId);

    // let deletedMatches = await removeMatchesFromLadder(req, res);
    
    // try {
    //     let deletedPlayer =  await prisma.player.delete({
    //         where: {
    //             id: playerId
    //         }
    //     })
    //     console.log(deletedPlayer)
    //    return deletedPlayer

    // } catch (error) {
    //     return error
    // }
    
}

