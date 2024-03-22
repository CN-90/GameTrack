// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const bcryptjs = require('bcryptjs');


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
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      break;

    case 'POST':
      let newUser = await CreateUser(req.body as User);
      res.status(200).json(newUser);
      break;

    default:
      res.status(405).end();

  }
}


async function CreateUser(user: User) {
  const { email, password, username } = user;
  
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    let newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    })
    return newUser;

  } catch (error: any) {
    if (error.code === 'P2002') {
      let uniqueField = error.meta.target[0];
      return { error: `${uniqueField} is already in use` }
    }
  }
}
