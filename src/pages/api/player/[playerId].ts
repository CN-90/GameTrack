import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma';


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
           return deletePlayer(req, res);            
        default:

    }
}


async function deletePlayer(req: NextApiRequest, res: NextApiResponse) {
    let playerId = parseInt(req.query.playerId);
    console.log(playerId);
    try {
        let deletedPlayer =  await prisma.player.delete({
            where: {
                id: playerId
            }
        })
        return res.status(200).json({ message:"Player deleted successfully", deletedPlayer });

    } catch (error) {
        return res.status(500).json({ message: "Failed to delete player." });
    }
    
}

