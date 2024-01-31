// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from "next-auth/jwt"
import prisma from '../../../../../../prisma/prisma';
import { getGroupById } from '@/helpers/groupHelper';


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
            await addMemberToGroup(req, req.query.gid, req.query.uid);
            res.status(200).json({ message: "Member has been added." });
            break;

        case 'DELETE':
            await removeMemberFromGroup(req, req.query.gid, req.query.uid);
            res.status(200).json({ message: "Member was removed from group." })
            break;


        default:
            res.status(405).end();

    }
}


async function addMemberToGroup(req: NextApiRequest, groupId: string, userId: string) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    
    if (token) {
        try {
            const updatedGroup = await prisma.group.update({
                where: {
                    id: parseInt(groupId)
                },
                data: {
                    members: {
                        connect: [{ id: parseInt(userId) }]
                    }
                }
            })


        } catch (error) {
            console.log(error);

        }

    }
}

async function removeMemberFromGroup(req: NextApiRequest, groupId: string, userId: string) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (token) {
        try {
            let group = await getGroupById(parseInt(groupId));
            let members = group.members;
            let newMembers = members.filter((member) => member.id !== parseInt(userId));

            const updatedGroup = await prisma.group.update({
                where: {
                    id: parseInt(groupId)
                },
                data: {
                    members: {
                        set: newMembers
                    }
                }
            })

            return updatedGroup;

        } catch (error) {
            console.log(error);
        }

    }
}