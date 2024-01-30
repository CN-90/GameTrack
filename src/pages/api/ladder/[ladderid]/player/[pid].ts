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
    let data = null;
    switch (req.method) {
        case 'GET':
            break;

        case 'POST':
            let addedPlayer = await addPlayerToLadder();
            break;

        case 'DELETE':
            
            break;


        default:
            res.status(405).end();

    }
}


async function addPlayerToLadder(req: NextApiRequest, res: NextApiResponse) {
    console.log("You've are trying to add a player.")
}


// async function addMemberToGroup(req: NextApiRequest, groupId: string, userId: string) {
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
//     if (token) {
//         try {
//             const updatedGroup = await prisma.group.update({
//                 where: {
//                     id: parseInt(groupId)
//                 },
//                 data: {
//                     members: {
//                         connect: [{ id: parseInt(userId) }]
//                     }
//                 }
//             })


//         } catch (error) {
//             console.log(error);

//         }

//     }
// }