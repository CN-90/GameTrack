import prisma from '../../../../prisma/prisma';
import { deleteMatch } from '@/helpers/matchHelper';
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

        case 'DELETE':
            let match = await deleteMatch(req.query.matchId);
            return res.status(200).json(match);

        default:
            return res.status(405).end();

    }
}
