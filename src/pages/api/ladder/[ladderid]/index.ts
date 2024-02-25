import prisma from "../../../../../prisma/prisma";
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

export async function getLadderById(ladderId: number, userId: number){
    let ladder = await prisma.ladder.findUnique({
        where: {
            id: parseInt(ladderId),
            userId: parseInt(userId)
        },
        include: {
            matches: { include: { winner: true, loser: true, } },
            players: true,
            records: { include: { wins: true, losses: true, player: true }, orderBy: { wins: { _count: 'desc' } } }
        }

    })

    return ladder;
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