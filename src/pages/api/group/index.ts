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




