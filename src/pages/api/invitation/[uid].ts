import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma';


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
            let data = await createInvitation(req);
            return res.status(200).json(data);

        default:
            return res.status(405).end();

    }
}


// async function createInvitation(req) {
//     const { username, groupId, adminId } = req.body;
//     let user = await prisma.user.findUnique({
//         where: {
//             username: req.body.username,
//         },

//     })

//     if (!user) {
//         console.log("No user with that username was found.");
//         return 'No user with that username was found.';
//     }

//     let invitation = await prisma.invitation.create({
//         data: {
//             sentToId: parseInt(user.id),
//             groupId: parseInt(groupId),
//         }
//     })


//     return `Invitation to ${username} has been sent.`;

// }

