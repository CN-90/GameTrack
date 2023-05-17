// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from "next-auth/jwt"
import prisma from '../../../../prisma/prisma'


type Data = {
    name: string
}
interface User {
    email: string;
    password: string;
    username: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case 'POST':
            let group = await createGroup(req)
            res.status(200).json(group);
            break;

        case 'DELETE':
            let data = await deleteGroup(req, req.query.gid);
            res.status(200).json({ message: 'Group has been successfully deleted.' })
            break;

        default:
            res.status(405).end();

    }
}


async function createGroup(req: NextApiRequest) {
    const { name, description } = req.body;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (token) {
        try {
            let userId = parseInt(token.userID);
            let newGroup = await prisma.group.create({
                data: {
                    name,
                    description,
                    // admin: {
                    //     create: {
                    //         userId: userId
                    //     }

                    // }
                }
            })

            await prisma.admin.create({
                data: {
                    userId,
                    groupId: newGroup.id
                }
            })



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


async function createAdmin(req: NextApiRequest, groupId) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (token) {
        try {
            let userId = token.userID
            let admin = await prisma.admin.create({
                data: {
                    userId,
                    groupId
                }
            })
            console.log(admin)

        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("no token");
    }
}




