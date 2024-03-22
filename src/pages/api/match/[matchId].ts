import prisma from '../../../../prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            break;

        case 'DELETE':
            let match = await deleteMatch(req.query.matchId);
            return res.status(200).json(match);

        default:
            return res.status(405).end();

    }
}


export async function deleteMatch(matchId: any) {
    const deletedMatch = await prisma.match.delete({
        where: {
            id: parseInt(matchId)
        }
    });
}