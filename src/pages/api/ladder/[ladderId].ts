import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma';



type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case 'GET':
            console.log(req.query.ladderId)
            // getLadder(req.query.ladderId)
            break;

        case 'POST':

        case 'DELETE':
            let ladder = await deleteLadder(req.query.ladderId);
            return res.status(200).json(ladder);
        

        default:
            return res.status(405).end();

    }
}

async function getLadder(ladderId: number){
    console.log("LadderID is: ", ladderId);
    
}

async function deleteLadder(ladderId: number){
    console.log('DeleteLadder is ' + ladderId);
    // prisma.ladder.delete({
    //     where: {
    //         id: ladderId
    //     }
    // })

    
}