import prisma from '../../../../prisma/prisma';
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
             data = await createLadder(req, res);
            return res.status(200).json({ message: "Ladder has been created.", data });

        case 'DELTE':
             data = await deleteLadder(req);
            return res.status(200).json({ message: "Ladder table has been deleted." });

        default:
            return res.status(405).end();

    }
}


async function createLadder(req: NextApiRequest, res: NextApiResponse) {
    const { name, userId, title } = req.body;

    const ladder = await prisma.ladder.create({
        data: {
            name: title,
            user: {
                connect: {
                    id: parseInt(userId)
                }
            }
        }
    })
    return ladder;
}

export async function deleteLadder(tableId: string) {
    const deletedLadder = await prisma.ladder.delete({
        where: {
            id: parseInt(tableId)
        }
    });

}