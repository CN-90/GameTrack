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
            data = await deletePlayer(req, res);
            

        default:

    }
}


async function deletePlayer(req: NextApiRequest, res: NextApiResponse) {
    // const { playerId } = req.body;
    console.log("Player Deleted")...
}

