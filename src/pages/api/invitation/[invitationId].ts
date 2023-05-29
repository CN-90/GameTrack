import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/prisma';


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
             data = await createInvitation(req);
            return res.status(200).json(data);

        case 'DELETE':
             data = await deleteInvitation(req);
            return res.status(200).json(data);

        default:
            return res.status(405).end();

    }
}


async function deleteInvitation(req){
    const { invitationId } = req.query;
    let deletedInvitation = await prisma.invitation.delete({
        where: {
            id: parseInt(invitationId),
        }
    });

    console.log("deleteInvitation(): Invitation has been deleted.");
}

