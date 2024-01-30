import { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case 'GET':
            break;

        case 'POST':
            break;

        case 'DELETE':
            let ladder = await deleteLadder(req, res);
            return res.status(200).json({ message: "Ladder has been deleted"});


        default:
            return res.status(405).end();

    }
}

async function getLadder(ladderId: number) {
    console.log("LadderID is: ", ladderId);

}

async function deleteLadder(req, res) {
    const ladderId = parseInt(req.query.ladderid);
    // delete players that are in the ladder

    try {
        let deletedLadder = await prisma.ladder.delete({
            where: {
                id: ladderId
            },
           
        })    

    }   catch (error) {
        console.log(error);
    }


    

}