// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { hash, genSalt, bcrypt } from 'bcryptjs'

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
    case 'GET':
      console.log("Get Request");
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
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    let newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    })
    return newUser;

  } catch (error) {
    if (error.code === 'P2002') {
      let uniqueField = error.meta.target[0];
      return { error: `${uniqueField} is already in use` }
    }
  }
}
