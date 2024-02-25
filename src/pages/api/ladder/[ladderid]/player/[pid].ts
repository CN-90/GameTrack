// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from "next-auth/jwt"
import prisma from '../../../../../../prisma/prisma';


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
            data = await addPlayerToLadder(req, res);
            return res.status(200).json({ message: "Player has been added to ladder.", data });
            break;

        case 'DELETE':
            data = await deletePlayerFromLadder(req, res);
            return res.status(200).json({ message: "Player has been removed from ladder.", data });
            break;


        default:
            res.status(405).end();

    }
}


async function addPlayerToLadder(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })


    if (token) {
        const { players, ladderId } = req.body;
        console.log(players);
        try {
            const updatedLadder = await prisma.ladder.update({
                where: {
                    id: parseInt(ladderId)
                },
                data: {
                    players: {
                        connect: players.map((player: any) => {
                            return { id: player.id }
                        })
                    },
                    records: {
                        create: players.map((player: any) => {
                            return { playerName: player.name, player: { connect: { id: player.id } } }
                        })
                    }
                }
            })

            return updatedLadder;
        } catch (error) {
            console.log(error);
        }
    }
}


async function deletePlayerFromLadder(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (token) {
        const { ladderid, pid } = req.query;
        console.log(req.body);
        try {
            const updatedLadder = await prisma.ladder.update({
                where: {
                    id: parseInt(ladderid)
                },
                data: {
                    players: {
                        disconnect: {
                            id: parseInt(pid)
                        }
                    }
                }
            })

            const deletedRecord = await deleteRecord(ladderid, pid);

            return updatedLadder;
        } catch (error) {
            console.log(error);
        }
    }

}

export async function deleteRecord(ladderId: string, playerId: string) {
    const deletedRecord = await prisma.record.deleteMany({
        where: {
            playerId: parseInt(playerId),
            ladderId: parseInt(ladderId)
        }
    });

    return deletedRecord;
}