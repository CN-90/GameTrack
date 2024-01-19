import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma';
import { getToken } from 'next-auth/jwt';


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
            data = await createPlayer(req, res);
            return res.status(200).json(data);

        case 'DELETE':

        default:

    }
}


async function createPlayer(req: NextApiRequest, res: NextApiResponse) {
    const { name } = req.body;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    let response = { error: "", player: null };

    if (token) {
        try {
            let userId = parseInt(token.userID);
            // console.log(userId)l
            let newPlayer = await prisma.player.create({
                data: {
                    name,
                    user: {
                        connect: {
                            id: userId
                        }
                    }
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


// async function createGroup(req: NextApiRequest) {
//     const { name, description } = req.body;
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
//     if (token) {
//         try {
//             let userId = parseInt(token.userID);
//             let newGroup = await prisma.group.create({
//                 data: {
//                     name,
//                     description,
//                 }
//             })

//             await prisma.admin.create({
//                 data: {
//                     userId,
//                     groupId: newGroup.id
//                 }
//             })



//         } catch (error) {
//             console.log(error);
//         }

//     }

// }