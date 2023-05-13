// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from "next-auth/jwt"
import prisma from '../../../../prisma/prisma';

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
            data = await getGroup(req, req.query.gid);
            res.status(200).json({ data });
            break;

        case 'POST':
            break;

        case 'DELETE':
            data = await deleteGroup(req, req.query.gid);
            res.status(200).json({ message: 'Group has been successfully deleted.' })
            break;


        default:
            res.status(405).end();

    }
}


async function getGroup(req: NextApiRequest, groupId: string) {
    const token = await getToken({ req })
    if (token) {
        try {

            const group = await prisma.group.findUnique({
                where: {
                    name: {
                        equals: groupId,
                        mode: 'insensitive', // Default value: default
                    }
                    
                },
                include: {
                    members: {
                        select: {
                            username: true,
                            image: true,
                        }
                    },
                    admin: {
                        include: {
                            user: {
                                select: {
                                    username: true,
                                    image: true,
                                
                                }
                            }
                           
                        }
                    }
                },
            })
            return group;

        } catch (error) {
            console.log(error);
        }
    }

}

async function deleteGroup(req: NextApiRequest, groupId: string) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (token) {
        try {
            const deletedAdmins = await prisma.admin.deleteMany({
                where: {
                    groupId: parseInt(groupId)
                }
            })
            const deletedGroup = await prisma.group.delete({
                where: {
                    id: parseInt(groupId),
                },
            })

        } catch (error) {
            console.log(error);
        }
    }
}


async function addMember(req: NextApiRequest, groupId: string, userId: string) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (token) {
       
    }
}