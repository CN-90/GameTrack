import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma';
import { getToken } from 'next-auth/jwt';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let data;
    switch (req.method) {
        case 'GET':
            break;

        case 'POST':
            data = await createPlayer(req);
            return res.status(200).json(data);

        case 'DELETE':

        default:

    }
}


async function createPlayer(req: any) {
    const { name } = req.body;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    let response = { error: "", player: {} };
    

    if (token) {
        try {
            let userId = token.userID
            let newPlayer = await prisma.player.create({
                data: {
                    name,
                    user: {
                        connect: {
                            id: userId as number
                        }
                    }
                },
                include: {
                    playerWins: true,
                    playerLosses: true,
                }
                
            })
            response.player = newPlayer;
        } catch (error) {
            console.log(error)
            if (error instanceof Error) response.error = error.message;
        }
    }
    return response;
}


