import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let data;
    switch (req.method) {
        case 'GET':
            break;

        case 'POST':
          

        case 'DELETE':
            let deletedPlayer = await deletePlayer(req);
            return res.status(200).json({message: "Player has been successfully deleted.", deletedPlayer});

        default:

    }
}


async function deletePlayer(req:any) {
    const playerId = parseInt(req.query.playerId);
        
    try {
        let deletedPlayer =  await prisma.player.delete({
            where: {
                id: playerId
            }
        })
        return deletedPlayer;
        
    } catch (error) {
        return error;
    }
    
}

