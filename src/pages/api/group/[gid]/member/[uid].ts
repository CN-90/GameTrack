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
            let data = await addMember(req, req.query.gid, req.query.uid);
            res.status(200.).json({ message: "Member has been added." });
            break;

        case 'DELETE':
            break;


        default:
            res.status(405).end();

    }
}


async function addMember(req: NextApiRequest, groupName: any, userId: any) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (token) {
        try {
            const group = await prisma.group.findUnique({
                where: {
                    name: groupName
                },
                include: {
                    members: true
                }
            });
            // let groupMembers = [...group.members, userId];

            // console.log(groupMembers);

            const updatedGroup = await prisma.group.update({
                where: {
                    name: groupName
                },
                data: {
                    members: {
                        set: userId
                    }
                }
            })

            console.log(updatedGroup);

        } catch (error) {
            console.log(error);

        }

    }
}