import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma';
import { getUserByUsername } from '@/fetchers/userFetcher';
import { getInvitation } from '@/fetchers/invitationFetcher';


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


async function createInvitation(req) {
    const { username, groupId, adminId } = req.body;

    let user = await getUserByUsername(username);

    if (!user) {
        return { error: "That user does not exist." }
    }

    // Check if an admin has already sent an invitation to this user.
    let invitationExists = await getInvitation(user.id, groupId);

    if (invitationExists) {
        return { error: "An invitation has already been sent to this user." };
    }

    let invitation = await prisma.invitation.create({
        data: {
            sentToId: parseInt(user.id),
            groupId: parseInt(groupId),
        }
    })


    return `Invitation to ${username} has been sent.`;

}


// model Invitation {
//     id           Int      @id @default(autoincrement())
//     createdAt    DateTime @default(now())
//     updatedAt    DateTime @updatedAt
//     inviteFrom   Admin    @relation(fields: [inviteFromId], references: [id])
//     inviteFromId Int
//     sentTo       User     @relation(fields: [senttoId], references: [id])
//     senttoId     Int
//     viewed       Boolean  @default(false)
//     accepted     Boolean  @default(false)
//     group        Group    @relation(fields: [groupId], references: [id])
//     groupId      Int
//     groupName    String
//   }