import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../../prisma/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      let user = await getUserById(req.query.uid);
      res.status(200).json({user});
      break;

    case 'POST':
      break;

    default:
      res.status(405).end();

  }
}

export async function getUserById(uid: any) {

  let user = await prisma.user.findUnique({
    where: {
      id: parseInt(uid)
    },
    include: {
      ladders: true,
      players: {
        include: {
          playerWins: true,
          playerLosses: true,
        },
        orderBy: { playerWins: { _count: 'desc' }}
        
      }
    }
  })

  let userWithExcludedFields = exclude(user, ['password', 'emailVerified', 'createdAt', 'updatedAt']);

  return userWithExcludedFields;
}

// Exclude keys from user
function exclude<User, Key extends keyof User>(
  user: any,
  keys: string[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}
