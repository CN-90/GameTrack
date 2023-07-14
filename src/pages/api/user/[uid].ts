import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../../prisma/prisma'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      let user = await getUser(req.query.uid);
      res.status(200).json({user});
      break;

    case 'POST':
      break;

    default:
      res.status(405).end();

  }
}

async function getUser(uid: any) {
  let totalGroups = [];

  let user = await prisma.user.findUnique({
    where: {
      id: parseInt(uid)
    },
    include: {
      ladders: true
    }
    // include: {
    //   groups: true,
    //   invitations: {
    //     select: {
    //       group: true,
    //       id: true
    //     }
    //   },
    //   admin: {
    //     select: {
    //       group: true
    //     }
    //   }
    // }
  })

  let userWithExcludedFields = exclude(user, ['password', 'emailVerified', 'createdAt', 'updatedAt']);

  // Combines the Admin groups and the reguler User groups into one array.
  // for(let data of userWithExcludedFields.admin ){
  //   totalGroups.push(data.group);
  // }

  // totalGroups = [...totalGroups, ...userWithExcludedFields.groups];
  // userWithExcludedFields.groups = totalGroups;
  

  return userWithExcludedFields;
}

// Exclude keys from user
function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}
