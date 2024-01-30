import prisma from "../../prisma/prisma";


export async function getUserByUsername(username: string){
    return await prisma.user.findUnique({
        where: {
            username
        },

    })
}



export async function getUserById(id: number){
    let user =  await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            players: true
        }

    })

    let userWithExcludedFields = exclude(user, ['password', 'emailVerified', 'createdAt', 'updatedAt']);
    return userWithExcludedFields;
}


export function exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key]
    }
    return user
  }