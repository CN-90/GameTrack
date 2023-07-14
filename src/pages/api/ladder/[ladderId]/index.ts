import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../prisma/prisma';



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

        case 'DELETE':
        

        default:
            return res.status(405).end();

    }
}


